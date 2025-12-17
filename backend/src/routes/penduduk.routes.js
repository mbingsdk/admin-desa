import express from "express";
import {
  getPenduduk,
  addPenduduk,
  editPenduduk,
  removePenduduk,
} from "../controllers/penduduk.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import { audit } from "../middlewares/auditLogger.js";

import { exportPendudukExcel } from "../controllers/penduduk.export.controller.js";

const router = express.Router();

// Semua route penduduk dilindungi JWT
router.use(protect);

router.get("/", protect, authorizeRoles("admin", "sekretaris"), getPenduduk);
router.post("/", protect, authorizeRoles("admin","sekretaris"), audit("penduduk","create",(req)=>req.body?.nik), addPenduduk);
router.put("/:id", protect, authorizeRoles("admin","sekretaris"), audit("penduduk","update"), editPenduduk);
router.delete("/:id", protect, authorizeRoles("admin"), audit("penduduk","delete"), removePenduduk);

router.get("/export/excel", protect, authorizeRoles("admin","sekretaris"), exportPendudukExcel);

export default router;
