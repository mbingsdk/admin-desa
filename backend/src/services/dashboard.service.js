import Penduduk from "../models/penduduk.model.js";
import Surat from "../models/surat.model.js";
import Arsip from "../models/arsip.model.js";
import Tx from "../models/keuTransaction.model.js";

export const getDashboardStats = async () => {
  const [totalPenduduk, totalSurat, totalArsip, totalTransaksi] = await Promise.all([
    Penduduk.countDocuments(),
    Surat.countDocuments(),
    Arsip.countDocuments(),
    Tx.countDocuments(),
  ]);

  const totalKeuangan = await Tx.aggregate([
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ]);

  const penerimaan = totalKeuangan.find((t) => t._id === "penerimaan")?.total || 0;
  const pengeluaran = totalKeuangan.find((t) => t._id === "pengeluaran")?.total || 0;

  const keuanganSummary = {
    penerimaan,
    pengeluaran,
    saldo: penerimaan - pengeluaran,
  };

  // ambil 5 surat dan arsip terbaru
  const latestSurat = await Surat.find().sort({ createdAt: -1 }).limit(5);
  const latestArsip = await Arsip.find().sort({ createdAt: -1 }).limit(5);

  return {
    totalPenduduk,
    totalSurat,
    totalArsip,
    totalTransaksi,
    keuanganSummary,
    latestSurat,
    latestArsip,
  };
};
