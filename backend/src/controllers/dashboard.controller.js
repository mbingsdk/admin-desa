import { getDashboardStats } from "../services/dashboard.service.js";

export const getStats = async (req, res) => {
  const stats = await getDashboardStats();
  res.json(stats);
};
