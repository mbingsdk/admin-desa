import Penduduk from "../models/penduduk.model.js";
import { applyWilayahScope } from "../middlewares/scope.middleware.js";

// ✅ Ambil semua data penduduk
export const getAllPenduduk = async (req) => {
  const filter = applyWilayahScope(req, {}); // scope berdasarkan user
  return Penduduk.find(filter).sort({ createdAt: -1 });
};

// ✅ Tambah data penduduk baru
export const createPenduduk = async (data) => {
  const penduduk = new Penduduk(data);
  return await penduduk.save();
};

// ✅ Update data penduduk berdasarkan ID
export const updatePenduduk = async (id, data) => {
  return await Penduduk.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Hapus data penduduk berdasarkan ID
export const deletePenduduk = async (id) => {
  return await Penduduk.findByIdAndDelete(id);
};
