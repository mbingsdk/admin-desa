import Tx from "../models/keuTransaction.model.js";
import Cat from "../models/keuCategory.model.js";
import mongoose from "mongoose";

// ---------- Category ----------
export const listCategories = () => Cat.find().sort({ name: 1 });
export const createCategory = (payload) => Cat.create(payload);
export const updateCategory = (id, payload) => Cat.findByIdAndUpdate(id, payload, { new: true });
export const deleteCategory = (id) => Cat.findByIdAndDelete(id);

// ---------- Transactions ----------
export const listTransactions = async ({ page=1, limit=20, q, type, categoryId, dateFrom, dateTo }) => {
  const filter = {};
  if (type) filter.type = type;
  if (categoryId && mongoose.isValidObjectId(categoryId)) filter.categoryId = categoryId;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = new Date(dateFrom);
    if (dateTo)   filter.date.$lte = new Date(dateTo);
  }
  if (q) filter.$or = [{ desc: new RegExp(q, "i") }];

  const skip = (page-1)*limit;
  const [data, total] = await Promise.all([
    Tx.find(filter).populate("categoryId").sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Tx.countDocuments(filter),
  ]);
  return { data, total, page, limit };
};

export const createTransaction = (payload, userId) => Tx.create({ ...payload, createdBy: userId });
export const updateTransaction = (id, payload) => Tx.findByIdAndUpdate(id, payload, { new: true });
export const deleteTransaction = (id) => Tx.findByIdAndDelete(id);

// ---------- Reports ----------
export const monthlySummary = async (year) => {
  const y = Number(year);
  const start = new Date(Date.UTC(y, 0, 1));
  const end   = new Date(Date.UTC(y+1, 0, 1));
  const rows = await Tx.aggregate([
    { $match: { date: { $gte: start, $lt: end } } },
    { $group: {
        _id: { m: { $month: "$date" }, type: "$type" },
        total: { $sum: "$amount" }
      } },
    { $group: {
        _id: "$_id.m",
        penerimaan: { $sum: { $cond: [{ $eq: ["$_id.type", "penerimaan"] }, "$total", 0] } },
        pengeluaran:{ $sum: { $cond: [{ $eq: ["$_id.type", "pengeluaran"] }, "$total", 0] } },
      } },
    { $project: { month: "$_id", _id: 0, penerimaan: 1, pengeluaran: 1, saldo: { $subtract: ["$penerimaan", "$pengeluaran"] } } },
    { $sort: { month: 1 } }
  ]);

  // normalisasi 12 bulan
  const map = new Map(rows.map(r=>[r.month,r]));
  const out = Array.from({length:12}, (_,i)=> {
    const m = i+1;
    const r = map.get(m) || { month:m, penerimaan:0, pengeluaran:0, saldo:0 };
    return r;
  });
  return out;
};

export const categorySummary = async ({ year }) => {
  const y = Number(year);
  const start = new Date(Date.UTC(y, 0, 1));
  const end   = new Date(Date.UTC(y+1, 0, 1));
  return Tx.aggregate([
    { $match: { date: { $gte: start, $lt: end } } },
    { $lookup: { from: "keucategories", localField: "categoryId", foreignField: "_id", as: "cat" } },
    { $unwind: "$cat" },
    { $group: { _id: { category: "$cat.name", type: "$type" }, total: { $sum: "$amount" } } },
    { $group: { _id: "$_id.category",
      penerimaan: { $sum: { $cond: [{ $eq: ["$_id.type","penerimaan"] }, "$total", 0] } },
      pengeluaran:{ $sum: { $cond: [{ $eq: ["$_id.type","pengeluaran"] },"$total",0] } }
    } },
    { $project: { _id: 0, category: "$_id", penerimaan: 1, pengeluaran: 1, saldo: { $subtract:["$penerimaan","$pengeluaran"] } } },
    { $sort: { saldo: -1 } }
  ]);
};
