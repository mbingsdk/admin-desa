import React,{useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { addTemplate, editTemplate } from "../templateSlice";

export default function TemplateEditorModal({ open, onClose, current }) {
  const dispatch = useDispatch();
  const [form,setForm] = useState({ name:"", code:"", body:"", variables:[] });
  const [varInput,setVarInput] = useState("");

  useEffect(()=>{ current ? setForm(current) : setForm({name:"",code:"",body:"",variables:[]}); },[current]);
  if(!open) return null;

  const addVar = () => {
    const clean = varInput.trim().toLowerCase();
    if (!clean) return;

    if (!/^[a-z_]+$/.test(clean)) {
      alert("Variabel hanya boleh huruf kecil dan underscore");
      return;
    }

    if (!form.variables.includes(clean)) {
      setForm((f) => ({ ...f, variables: [...f.variables, clean] }));
    }

    setVarInput("");
  };

  const removeVar=(v)=> setForm(f=>({...f, variables:f.variables.filter(x=>x!==v)}));

  const submit=(e)=>{
    e.preventDefault();
    current
      ? dispatch(editTemplate({ id: current._id, data: form }))
      : dispatch(addTemplate(form));
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-2">{current?"Edit":"Tambah"} Template</h3>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <input className="input input-bordered" placeholder="Nama" value={form.name}
                 onChange={e=>setForm({...form,name:e.target.value})} required />
          <input className="input input-bordered" placeholder="Kode (SKD)" value={form.code}
                 onChange={e=>setForm({...form,code:e.target.value})} required />
          <textarea className="textarea textarea-bordered col-span-2 min-h-[160px]"
            placeholder="Isi template, contoh: Saya {{nama}} NIK {{nik}} ..."
            value={form.body} onChange={e=>setForm({...form,body:e.target.value})} required />
          <div className="col-span-2">
            <div className="flex gap-2">
              <input className="input input-bordered" placeholder="variabel (nama)"
                     value={varInput} onChange={e=>setVarInput(e.target.value)} />
              <button type="button" className="btn" onClick={addVar}>Tambah</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.variables.map(v=>(
                <span key={v} className="badge badge-outline">
                  {`{{${v}}}`}
                  <button type="button" className="ml-1" onClick={()=>removeVar(v)}>✕</button>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>Batal</button>
            <button className="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
