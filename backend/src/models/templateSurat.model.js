import mongoose from "mongoose";

const templateSuratSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Nama template
  code: { type: String, required: true, unique: true }, // Kode unik (SKD, SKTM)
  body: { type: String, required: true },           // Isi template (pakai {{variabel}})
  variables: [{ type: String }],                    // ["nama","nik","alamat"]
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("TemplateSurat", templateSuratSchema);
