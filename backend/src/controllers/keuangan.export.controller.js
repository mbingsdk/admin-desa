import PDFDocument from "pdfkit";
import { monthlySummary } from "../services/keuangan.service.js";

export const exportKeuanganPdf = async (req,res)=>{
  const year = Number(req.query.year)||new Date().getFullYear();
  const data = await monthlySummary(year);

  res.setHeader("Content-Type","application/pdf");
  res.setHeader("Content-Disposition",`attachment; filename=laporan-keuangan-${year}.pdf`);
  const doc = new PDFDocument({ size:"A4", margin:40 });
  doc.pipe(res);

  doc.fontSize(16).text(`Laporan Keuangan Tahun ${year}`, { align:"center" });
  doc.moveDown();

  data.forEach((m)=>{
    doc.fontSize(12).text(
      `Bulan ${m.month}: Penerimaan Rp ${m.penerimaan.toLocaleString("id-ID")} | ` +
      `Pengeluaran Rp ${m.pengeluaran.toLocaleString("id-ID")} | ` +
      `Saldo Rp ${m.saldo.toLocaleString("id-ID")}`
    );
  });

  doc.end();
};
