import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import { getStats } from "../controllers/dashboard.controller.js";

const router = Router();
router.get("/", protect, getStats);
export default router;
