import React,{useEffect,useState} from "react";
import Layout from "../components/Layout";
import { useDispatch,useSelector } from "react-redux";
import { fetchTemplates, deleteTemplate } from "../features/template/templateSlice";
import TemplateTable from "../features/template/components/TemplateTable";
import TemplateEditorModal from "../features/template/components/TemplateEditorModal";

export default function TemplateSuratList(){
  const dispatch = useDispatch();
  const { items } = useSelector(s=>s.template);
  const [open,setOpen]=useState(false);
  const [current,setCurrent]=useState(null);

  useEffect(()=>{ dispatch(fetchTemplates()); },[dispatch]);

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Template Surat</h1>
        <button className="btn btn-primary" onClick={()=>{setCurrent(null);setOpen(true);}}>+ Template</button>
      </div>
      <TemplateTable data={items}
        onEdit={(t)=>{setCurrent(t);setOpen(true);}}
        onDelete={(id)=>confirm("Hapus?")&&dispatch(deleteTemplate(id))} />
      <TemplateEditorModal open={open} onClose={()=>setOpen(false)} current={current}/>
    </Layout>
  );
}
