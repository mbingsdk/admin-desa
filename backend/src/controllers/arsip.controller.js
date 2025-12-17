import * as svc from "../services/arsip.service.js";

export const list = async (req, res) => {
  const { q, category } = req.query;
  const data = await svc.listArsip({ q, category });
  res.json(data);
};

export const upload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File tidak ditemukan" });
  const file = req.file;

  const payload = {
    title: req.body.title,
    category: req.body.category,
    fileName: file.filename,
    originalName: file.originalname,
    fileType: file.mimetype,
    size: file.size,
    uploadedBy: req.user.id,
  };

  const created = await svc.createArsip(payload);
  res.status(201).json(created);
};

export const remove = async (req, res) => {
  await svc.deleteArsip(req.params.id);
  res.status(204).send();
};

export const download = async (req, res) => {
  const data = await svc.getArsip(req.params.id);
  if (!data) return res.status(404).json({ message: "Arsip tidak ditemukan" });
  const filePath = `uploads/arsip/${data.fileName}`;
  res.download(filePath, data.originalName);
};
