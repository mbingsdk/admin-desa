import mongoose from "mongoose";

const keuCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. Dana Desa, Pajak, Hibah
  type: { type: String, enum: ["penerimaan", "pengeluaran"], required: true },
  code: { type: String, unique: true }, // opsional, e.g. 4.2.1 (4 null, 2 name, 1 type)
  note: String,
}, { timestamps: true });

export default mongoose.model("KeuCategory", keuCategorySchema);
