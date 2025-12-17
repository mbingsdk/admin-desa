import { Router } from "express";
import { list, create, update, remove, printPdf } from "../controllers/surat.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";

const router = Router();

router.use(protect);
router.get("/", list);
router.post("/", authorizeRoles("admin", "sekretaris"), create);
router.put("/:id", authorizeRoles("admin", "sekretaris"), update);
router.delete("/:id", authorizeRoles("admin"), remove);
router.get("/:id/print", authorizeRoles("admin", "sekretaris"), printPdf);

export default router;
