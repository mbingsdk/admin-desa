import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSurat, updateSurat } from "../suratSlice";
import { fetchTemplates } from "../../template/templateSlice";

export default function SuratFormModal({ open, onClose, current }) {
  const dispatch = useDispatch();
  const { items: templates } = useSelector(s => s.template);
  const [form, setForm] = useState({
    noSurat: "", jenis: "keluar", templateCode: "", data: {}
  });

  useEffect(()=>{ dispatch(fetchTemplates()); },[dispatch]);
  useEffect(()=>{
    if(current) setForm(current);
    else setForm({ noSurat:"", jenis:"keluar", templateCode:"", data:{} });
  },[current]);

  const setDataField = (k,v)=> setForm(f=>({ ...f, data: { ...f.data, [k]: v } }));

  const onSubmit=(e)=>{
    e.preventDefault();
    if(current) dispatch(updateSurat({ id: current._id, data: form }));
    else dispatch(createSurat(form));
    onClose();
  };

  if(!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-3">{current?"Edit Surat":"Buat Surat"}</h3>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input input-bordered w-full" placeholder="No. Surat"
                 value={form.noSurat} onChange={e=>setForm({...form,noSurat:e.target.value})}/>
          <select className="select select-bordered w-full"
                  value={form.jenis} onChange={e=>setForm({...form,jenis:e.target.value})}>
            <option value="masuk">Masuk</option>
            <option value="keluar">Keluar</option>
          </select>
          <select className="select select-bordered w-full"
                  value={form.templateCode} onChange={e=>setForm({...form,templateCode:e.target.value})}>
            <option value="">Pilih Template</option>
            {templates.map(t=> <option key={t._id} value={t.code}>{t.name} ({t.code})</option>)}
          </select>

          {/* Form dinamis dari variables template (opsional sederhana) */}
          {templates.find(t=>t.code===form.templateCode)?.variables?.map(v=>(
            <input key={v} className="input input-bordered w-full" placeholder={v}
                   value={form.data?.[v]||""} onChange={e=>setDataField(v,e.target.value)} />
          ))}

          <div className="flex justify-end gap-2 pt-2">
            <button className="btn" type="button" onClick={onClose}>Batal</button>
            <button className="btn btn-primary" type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
