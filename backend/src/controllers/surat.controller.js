import * as service from "../services/surat.service.js";

export const list = async (req, res) => {
  const { q, jenis, page, limit } = req.query;
  const result = await service.listSurat({ q, jenis, page: Number(page)||1, limit: Number(limit)||20 });
  res.json(result);
};

export const create = async (req, res) => {
  const created = await service.createSurat(req.body, req.user.id);
  res.status(201).json(created);
};

export const update = async (req, res) => {
  const updated = await service.updateSurat(req.params.id, req.body);
  res.json(updated);
};

export const remove = async (req, res) => {
  await service.deleteSurat(req.params.id);
  res.status(204).send();
};

// PDF: balikin binary PDF
export const printPdf = async (req, res) => {
  const { content, surat } = await service.getRenderedSurat(req.params.id);
  // generate PDF sederhana via pdfkit
  const PDFDocument = (await import("pdfkit")).default;
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="surat-${surat.noSurat}.pdf"`);
  doc.pipe(res);

  doc.fontSize(14).text("PEMERINTAH DESA ................", { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Nomor: ${surat.noSurat}`, { align: "center" });
  doc.moveDown(1);
  doc.fontSize(12).text(content, { align: "justify" });
  doc.moveDown(2);
  doc.text(`\n${new Date().toLocaleDateString("id-ID")}`, { align: "right" });
  doc.text("\nKepala Desa __________________", { align: "right" });

  doc.end();
};
