import mongoose from "mongoose";

const arsipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileName: { type: String, required: true },  // nama file di server
  originalName: { type: String, required: true },
  category: { type: String, required: true },  // e.g. "Keuangan", "Surat", "Laporan"
  fileType: { type: String },                  // "pdf", "jpg", "docx", etc
  size: { type: Number },                      // ukuran (bytes)
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Arsip", arsipSchema);
