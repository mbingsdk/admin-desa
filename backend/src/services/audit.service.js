import Audit from "../models/audit.model.js";
export const writeAudit = (entry) => Audit.create(entry);
export const listAudit = ({ module, action, page=1, limit=20 }) => {
  const filter = { ...(module?{module}:{}) , ...(action?{action}:{}) };
  const skip = (page-1)*limit;
  return Promise.all([
    Audit.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("userId","name email role"),
    Audit.countDocuments(filter)
  ]).then(([data,total])=>({ data,total,page,limit }));
};
