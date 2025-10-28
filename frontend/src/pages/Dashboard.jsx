import React from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card bg-primary text-primary-content p-4">
          <h2 className="text-xl font-semibold">Total Penduduk</h2>
          <p className="text-3xl mt-2">1,203</p>
        </div>
        <div className="card bg-secondary text-secondary-content p-4">
          <h2 className="text-xl font-semibold">Surat Bulan Ini</h2>
          <p className="text-3xl mt-2">42</p>
        </div>
        <div className="card bg-accent text-accent-content p-4">
          <h2 className="text-xl font-semibold">Total Keuangan</h2>
          <p className="text-3xl mt-2">Rp 320jt</p>
        </div>
        <div className="card bg-neutral text-neutral-content p-4">
          <h2 className="text-xl font-semibold">Arsip Dokumen</h2>
          <p className="text-3xl mt-2">180</p>
        </div>
      </div>
    </Layout>
  );
}
