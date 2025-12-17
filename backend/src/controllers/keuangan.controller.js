import * as svc from "../services/keuangan.service.js";

// Categories
export const catList = async (req,res)=> res.json(await svc.listCategories());
export const catCreate = async (req,res)=> res.status(201).json(await svc.createCategory(req.body));
export const catUpdate = async (req,res)=> res.json(await svc.updateCategory(req.params.id, req.body));
export const catDelete = async (req,res)=> { await svc.deleteCategory(req.params.id); res.status(204).send(); };

// Transactions
export const txList = async (req,res)=> {
  const { page, limit, q, type, categoryId, dateFrom, dateTo } = req.query;
  const result = await svc.listTransactions({ page:Number(page)||1, limit:Number(limit)||20, q, type, categoryId, dateFrom, dateTo });
  res.json(result);
};
export const txCreate = async (req,res)=> res.status(201).json(await svc.createTransaction(req.body, req.user.id));
export const txUpdate = async (req,res)=> res.json(await svc.updateTransaction(req.params.id, req.body));
export const txDelete = async (req,res)=> { await svc.deleteTransaction(req.params.id); res.status(204).send(); };

// Reports
export const repMonthly = async (req,res)=> res.json(await svc.monthlySummary(req.query.year || new Date().getFullYear()));
export const repCategory = async (req,res)=> res.json(await svc.categorySummary({ year: req.query.year || new Date().getFullYear() }));
