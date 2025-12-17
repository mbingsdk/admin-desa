import ExcelJS from "exceljs";
import Penduduk from "../models/penduduk.model.js";
import { applyWilayahScope } from "../middlewares/scope.middleware.js";

export const exportPendudukExcel = async (req,res)=>{
  const filter = applyWilayahScope(req,{});
  const rows = await Penduduk.find(filter).lean();

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Penduduk");
  ws.columns = [
    { header: "NIK", key: "nik", width: 18 },
    { header: "Nama", key: "nama", width: 24 },
    { header: "Alamat", key: "alamat", width: 28 },
    { header: "RT", key: "rt", width: 6 },
    { header: "RW", key: "rw", width: 6 },
    { header: "Tgl Lahir", key: "tglLahir", width: 14 },
  ];
  rows.forEach(r=> ws.addRow({ ...r, tglLahir: r.tglLahir? new Date(r.tglLahir).toLocaleDateString("id-ID"):"" }));

  res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition","attachment; filename=penduduk.xlsx");
  await wb.xlsx.write(res);
  res.end();
};
