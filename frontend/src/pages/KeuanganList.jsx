import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchTransactions, setFilters, addTransaction, editTransaction, removeTransaction, fetchMonthly, fetchCatReport } from "../features/keuangan/keuSlice";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";

function TxFormModal({ open, onClose, categories, current, onSubmit }) {
  const [form, setForm] = useState({ date:"", type:"penerimaan", amount:0, categoryId:"", desc:"" });
  useEffect(()=>{ current ? setForm({ ...current, date: current.date?.slice(0,10) }) :
    setForm({ date:"", type:"penerimaan", amount:0, categoryId:"", desc:"" }) },[current]);

  if(!open) return null;
  const submit=(e)=>{ e.preventDefault(); onSubmit(form); };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-lg mb-3">{current?"Edit Transaksi":"Tambah Transaksi"}</h3>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <input type="date" className="input input-bordered" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} required />
          <select className="select select-bordered" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}>
            <option value="penerimaan">Penerimaan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
          <input type="number" className="input input-bordered" placeholder="Jumlah" value={form.amount} onChange={(e)=>setForm({...form,amount:Number(e.target.value)})} required />
          <select className="select select-bordered" value={form.categoryId} onChange={(e)=>setForm({...form,categoryId:e.target.value})} required>
            <option value="">Pilih Kategori</option>
            {categories.map(c=><option key={c._id} value={c._id}>{c.name} ({c.type})</option>)}
          </select>
          <input className="input input-bordered col-span-2" placeholder="Keterangan" value={form.desc||""} onChange={(e)=>setForm({...form,desc:e.target.value})}/>
          <div className="col-span-2 flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function KeuanganList(){
  const dispatch = useDispatch();
  const { categories, transactions, filters, monthly, catReport, loading } = useSelector(s=>s.keu);
  const [open,setOpen] = useState(false);
  const [current,setCurrent] = useState(null);
  const year = new Date().getFullYear();

  useEffect(()=>{ dispatch(fetchCategories()); },[dispatch]);
  useEffect(()=>{ dispatch(fetchTransactions(filters)); },[dispatch, filters]);
  useEffect(()=>{ dispatch(fetchMonthly(year)); dispatch(fetchCatReport(year)); },[dispatch, year]);

  const onAdd=()=>{ setCurrent(null); setOpen(true); };
  const onEdit=(row)=>{ setCurrent({ ...row, date: new Date(row.date).toISOString() }); setOpen(true); };
  const onDelete=(id)=>{ if(confirm("Hapus transaksi?")) dispatch(removeTransaction(id)); };
  const onSubmit=(form)=>{
    if(current) dispatch(editTransaction({ id: current._id, data: form }));
    else dispatch(addTransaction(form));
    setOpen(false);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keuangan Desa</h1>
        <button className="btn btn-primary" onClick={onAdd}>+ Transaksi</button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <input className="input input-bordered" placeholder="Cari keterangan" onChange={(e)=>dispatch(setFilters({ q: e.target.value }))}/>
        <select className="select select-bordered" onChange={(e)=>dispatch(setFilters({ type: e.target.value }))}>
          <option value="">Semua Tipe</option>
          <option value="penerimaan">Penerimaan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
        <select className="select select-bordered" onChange={(e)=>dispatch(setFilters({ categoryId: e.target.value }))}>
          <option value="">Semua Kategori</option>
          {categories.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type="date" className="input input-bordered" onChange={(e)=>dispatch(setFilters({ dateFrom: e.target.value }))}/>
        <input type="date" className="input input-bordered" onChange={(e)=>dispatch(setFilters({ dateTo: e.target.value }))}/>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tanggal</th><th>Tipe</th><th>Kategori</th><th>Keterangan</th><th className="text-right">Jumlah</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr><td colSpan="6" className="text-center p-4">Loading...</td></tr>
          ) : transactions.data.length === 0 ? (
            <tr><td colSpan="6" className="text-center p-4">Tidak ada data</td></tr>
          ) : transactions.data.map(tx=>(
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td className={tx.type==="penerimaan"?"text-success":"text-error"}>{tx.type}</td>
              <td>{tx.categoryId?.name || "-"}</td>
              <td>{tx.desc || "-"}</td>
              <td className="text-right">Rp {tx.amount.toLocaleString("id-ID")}</td>
              <td className="flex gap-2">
                <button className="btn btn-xs btn-warning" onClick={()=>onEdit(tx)}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={()=>onDelete(tx._id)}>Hapus</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card bg-base-100 p-4 shadow">
          <h2 className="font-semibold mb-2">Rekap Bulanan {year}</h2>
          <LineChart width={520} height={260} data={monthly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="penerimaan" />
            <Line type="monotone" dataKey="pengeluaran" />
            <Line type="monotone" dataKey="saldo" />
          </LineChart>
        </div>
        <div className="card bg-base-100 p-4 shadow">
          <h2 className="font-semibold mb-2">Rekap per Kategori {year}</h2>
          <BarChart width={520} height={260} data={catReport}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="penerimaan" />
            <Bar dataKey="pengeluaran" />
          </BarChart>
        </div>
      </div>

      <TxFormModal open={open} onClose={()=>setOpen(false)} current={current} categories={categories} onSubmit={onSubmit}/>
    </Layout>
  );
}
