import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import { listAudit } from "../services/audit.service.js";

const router = Router();
router.get("/", protect, authorizeRoles("admin","sekretaris"),
  async (req,res)=> {
    const { module, action, page, limit } = req.query;
    res.json(await listAudit({ module, action, page:Number(page)||1, limit:Number(limit)||20 }));
  }
);

export default router;
