import Arsip from "../models/arsip.model.js";
import fs from "fs";
import path from "path";

export const listArsip = async ({ q, category }) => {
  const filter = {};
  if (q) filter.title = new RegExp(q, "i");
  if (category) filter.category = category;

  return Arsip.find(filter).sort({ createdAt: -1 }).lean();
};

export const getArsip = (id) => Arsip.findById(id);

export const createArsip = (payload) => Arsip.create(payload);

export const deleteArsip = async (id) => {
  const data = await Arsip.findById(id);
  if (!data) throw new Error("Arsip tidak ditemukan");
  const filePath = path.join(process.cwd(), "uploads", "arsip", data.fileName);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  await data.deleteOne();
};
