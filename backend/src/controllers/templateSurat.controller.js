import * as svc from "../services/templateSurat.service.js";

export const list = async (req, res) => {
  const data = await svc.listTemplates({ q: req.query.q });
  res.json(data);
};

export const getOne = async (req, res) => {
  const data = await svc.getTemplate(req.params.id);
  res.json(data);
};

export const create = async (req, res) => {
  const created = await svc.createTemplate(req.body);
  res.status(201).json(created);
};

export const update = async (req, res) => {
  const updated = await svc.updateTemplate(req.params.id, req.body);
  res.json(updated);
};

export const remove = async (req, res) => {
  await svc.deleteTemplate(req.params.id);
  res.status(204).send();
};
