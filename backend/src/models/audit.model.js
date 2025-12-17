import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  module: { type: String, required: true },       // "penduduk", "surat", "keuangan", "arsip"
  action: { type: String, required: true },       // "create","update","delete","login"
  refId: { type: String },                        // id entitas terkait
  payload: { type: Object },                      // ringkas data penting
  ip: String,
  ua: String
}, { timestamps: true });

auditSchema.index({ module: 1, action: 1, createdAt: -1 });

export default mongoose.model("Audit", auditSchema);
