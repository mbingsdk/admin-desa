import Template from "../models/templateSurat.model.js";

export const listTemplates = async ({ q }) => {
  const filter = q ? { name: new RegExp(q, "i") } : {};
  return Template.find(filter).sort({ createdAt: -1 });
};

export const getTemplate = async (id) => {
  const tpl = await Template.findById(id);
  if (!tpl) throw new Error("Template tidak ditemukan");
  return tpl;
};

export const createTemplate = async (payload) => {
  const exist = await Template.findOne({ code: payload.code });
  if (exist) throw new Error("Kode template sudah digunakan");
  return Template.create(payload);
};

export const updateTemplate = async (id, payload) => {
  return Template.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteTemplate = async (id) => {
  return Template.findByIdAndDelete(id);
};
