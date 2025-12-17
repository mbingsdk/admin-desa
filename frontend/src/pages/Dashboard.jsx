import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../features/dashboard/dashboardSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading || !data) return <Layout><div>Memuat data dashboard...</div></Layout>;

  const { totalPenduduk, totalSurat, totalArsip, totalTransaksi, keuanganSummary, latestSurat, latestArsip } = data;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard Desa Digital</h1>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card bg-primary text-primary-content p-4">
          <h2 className="text-lg font-semibold">Penduduk</h2>
          <p className="text-3xl font-bold mt-2">{totalPenduduk}</p>
        </div>
        <div className="card bg-secondary text-secondary-content p-4">
          <h2 className="text-lg font-semibold">Surat</h2>
          <p className="text-3xl font-bold mt-2">{totalSurat}</p>
        </div>
        <div className="card bg-accent text-accent-content p-4">
          <h2 className="text-lg font-semibold">Arsip</h2>
          <p className="text-3xl font-bold mt-2">{totalArsip}</p>
        </div>
        <div className="card bg-neutral text-neutral-content p-4">
          <h2 className="text-lg font-semibold">Transaksi</h2>
          <p className="text-3xl font-bold mt-2">{totalTransaksi}</p>
        </div>
      </div>

      {/* Rekap Keuangan */}
      <div className="card bg-base-100 shadow mb-6 p-4">
        <h2 className="text-xl font-semibold mb-2">Rekap Keuangan</h2>
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-sm opacity-60">Penerimaan</p>
            <p className="text-2xl text-success font-bold">Rp {keuanganSummary.penerimaan.toLocaleString("id-ID")}</p>
          </div>
          <div>
            <p className="text-sm opacity-60">Pengeluaran</p>
            <p className="text-2xl text-error font-bold">Rp {keuanganSummary.pengeluaran.toLocaleString("id-ID")}</p>
          </div>
          <div>
            <p className="text-sm opacity-60">Saldo</p>
            <p className="text-2xl font-bold">Rp {keuanganSummary.saldo.toLocaleString("id-ID")}</p>
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold mb-2">Surat Terbaru</h3>
          <ul className="menu bg-base-100 rounded-box">
            {latestSurat.map((s) => (
              <li key={s._id} className="border-b">
                <div>
                  <p className="font-medium">{s.noSurat}</p>
                  <small>{new Date(s.createdAt).toLocaleDateString()}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card bg-base-100 shadow p-4">
          <h3 className="font-semibold mb-2">Arsip Terbaru</h3>
          <ul className="menu bg-base-100 rounded-box">
            {latestArsip.map((a) => (
              <li key={a._id} className="border-b">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <small>{a.category} — {new Date(a.createdAt).toLocaleDateString()}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grafik Dummy Placeholder (nanti bisa isi dari keuangan summary bulanan) */}
      <div className="card bg-base-100 shadow p-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Grafik Perkembangan Keuangan (simulasi)</h2>
        <LineChart width={600} height={250} data={[
          { bulan: "Jan", saldo: 1000000 },
          { bulan: "Feb", saldo: 1400000 },
          { bulan: "Mar", saldo: 1300000 },
          { bulan: "Apr", saldo: 1600000 },
          { bulan: "Mei", saldo: 1500000 },
        ]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bulan" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="saldo" stroke="#3b82f6" />
        </LineChart>
      </div>
    </Layout>
  );
}
