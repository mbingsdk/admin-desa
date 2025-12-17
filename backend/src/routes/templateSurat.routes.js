import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import * as c from "../controllers/templateSurat.controller.js";

const router = Router();
router.use(protect);

router.get("/", authorizeRoles("admin","sekretaris"), c.list);
router.get("/:id", authorizeRoles("admin","sekretaris"), c.getOne);
router.post("/", authorizeRoles("admin","sekretaris"), c.create);
router.put("/:id", authorizeRoles("admin","sekretaris"), c.update);
router.delete("/:id", authorizeRoles("admin"), c.remove);

export default router;
