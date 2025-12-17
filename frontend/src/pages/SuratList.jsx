import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurat, deleteSurat } from "../features/surat/suratSlice";
import SuratTable from "../features/surat/components/SuratTable";
import SuratFormModal from "../features/surat/components/SuratFormModal";

export default function SuratList(){
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s=>s.surat);
  const [open,setOpen] = useState(false);
  const [current,setCurrent] = useState(null);

  useEffect(()=>{ dispatch(fetchSurat()); },[dispatch]);

  const onEdit = (row)=>{ setCurrent(row); setOpen(true); };
  const onAdd = ()=>{ setCurrent(null); setOpen(true); };
  const onDelete = (id)=>{ if(confirm("Hapus surat ini?")) dispatch(deleteSurat(id)); };

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Manajemen Surat</h1>
        <button className="btn btn-primary" onClick={onAdd}>+ Buat Surat</button>
      </div>

      {loading? <div>Loading...</div> : <SuratTable data={items} onEdit={onEdit} onDelete={onDelete} />}

      <SuratFormModal open={open} onClose={()=>setOpen(false)} current={current}/>
    </Layout>
  );
}
