import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import { list, upload, remove, download } from "../controllers/arsip.controller.js";
import { uploadArsip } from "../middlewares/uploadArsip.js";

const router = Router();

router.use(protect);

router.get("/", authorizeRoles("admin", "sekretaris", "bendahara"), list);
router.post("/", authorizeRoles("admin", "sekretaris"), uploadArsip, upload);
router.delete("/:id", authorizeRoles("admin", "sekretaris"), remove);
router.get("/:id/download", authorizeRoles("admin", "sekretaris", "bendahara"), download);

export default router;
