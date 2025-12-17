import Surat from "../models/surat.model.js";
import Template from "../models/templateSurat.model.js";

// util render: ganti {{var}} dengan nilai data[var] (fallback kosong)
const renderBody = (templateBody, data) =>
  templateBody.replace(/\{\{(\w+)\}\}/g, (_, key) => (data?.[key] ?? ""));

export const listSurat = ({ q, jenis, page = 1, limit = 20 }) => {
  const filter = {
    ...(q ? { $or: [
      { noSurat: new RegExp(q, "i") },
      { jenis: new RegExp(q, "i") }
    ] } : {}),
    ...(jenis ? { jenis } : {})
  };
  return Promise.all([
    Surat.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).lean(),
    Surat.countDocuments(filter)
  ]).then(([data, total]) => ({ data, total, page, limit }));
};

export const createSurat = async (payload, userId) => {
  const tpl = await Template.findOne({ code: payload.templateCode });
  if (!tpl) throw new Error("Template tidak ditemukan");
  return Surat.create({
    ...payload,
    createdBy: userId,
    status: payload.status || "draft"
  });
};

export const updateSurat = (id, payload) => Surat.findByIdAndUpdate(id, payload, { new: true });
export const deleteSurat = (id) => Surat.findByIdAndDelete(id);

// untuk cetak: gabung template + data -> string siap PDF
export const getRenderedSurat = async (id) => {
  const s = await Surat.findById(id).lean();
  if (!s) throw new Error("Surat tidak ditemukan");
  const tpl = await Template.findOne({ code: s.templateCode }).lean();
  if (!tpl) throw new Error("Template tidak ditemukan");
  const content = renderBody(tpl.body, s.data);
  return { surat: s, template: tpl, content };
};
