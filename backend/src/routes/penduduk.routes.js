import express from "express";
import {
  getPenduduk,
  addPenduduk,
  editPenduduk,
  removePenduduk,
} from "../controllers/penduduk.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";

const router = express.Router();

// Semua route penduduk dilindungi JWT
router.use(protect);

router.get("/", protect, authorizeRoles("admin", "staff"), getPenduduk);
router.post("/", protect, authorizeRoles("admin"), addPenduduk);
router.put("/:id", protect, authorizeRoles("admin"), editPenduduk);
router.delete("/:id", protect, authorizeRoles("admin"), removePenduduk);

export default router;
