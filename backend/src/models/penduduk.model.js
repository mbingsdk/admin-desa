import mongoose from "mongoose";

const pendudukSchema = new mongoose.Schema(
  {
    nik: { type: String, required: true, unique: true },
    nama: { type: String, required: true },
    alamat: { type: String, required: true },
    tglLahir: { type: Date, required: true },
    jenisKelamin: { type: String, required: true },
    statusKeluarga: { type: String, required: true },
    agama: { type: String },
    pekerjaan: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Penduduk", pendudukSchema);
