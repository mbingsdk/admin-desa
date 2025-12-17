import {
  getAllPenduduk,
  createPenduduk,
  updatePenduduk,
  deletePenduduk,
} from "../services/penduduk.service.js";

// GET semua penduduk
export const getPenduduk = async (req, res) => {
  try {
    const data = await getAllPenduduk(req);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data penduduk" });
  }
};

// POST tambah penduduk
export const addPenduduk = async (req, res) => {
  try {
    const data = await createPenduduk(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambah data penduduk" });
  }
};

// PUT update penduduk
export const editPenduduk = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await updatePenduduk(id, req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengubah data penduduk" });
  }
};

// DELETE hapus penduduk
export const removePenduduk = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePenduduk(id);
    res.json({ message: "Data penduduk dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus data penduduk" });
  }
};
