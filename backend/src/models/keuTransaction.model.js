import mongoose from "mongoose";

const keuTransactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ["penerimaan", "pengeluaran"], required: true },
  amount: { type: Number, required: true, min: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "KeuCategory", required: true },
  desc: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

keuTransactionSchema.index({ date: 1, type: 1, categoryId: 1 });

export default mongoose.model("KeuTransaction", keuTransactionSchema);
