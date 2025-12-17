import mongoose from "mongoose";

const suratSchema = new mongoose.Schema({
  noSurat: { type: String, required: true },
  jenis: { type: String, required: true },         // "masuk" | "keluar"
  templateCode: { type: String, required: true },  // refer ke TemplateSurat.code
  pemohonPendudukId: { type: mongoose.Schema.Types.ObjectId, ref: "Penduduk" },
  data: { type: Object, default: {} },             // nilai variabel (nama, nik, alamat, dll)
  status: { type: String, enum: ["draft", "selesai"], default: "draft" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Surat", suratSchema);
