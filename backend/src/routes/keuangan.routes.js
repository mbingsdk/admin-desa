import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.roles.js";
import * as c from "../controllers/keuangan.controller.js";

import { exportKeuanganPdf } from "../controllers/keuangan.export.controller.js";

const router = Router();
router.use(protect);

// Categories
router.get("/categories", authorizeRoles("admin","bendahara","sekretaris"), c.catList);
router.post("/categories", authorizeRoles("admin","bendahara"), c.catCreate);
router.put("/categories/:id", authorizeRoles("admin","bendahara"), c.catUpdate);
router.delete("/categories/:id", authorizeRoles("admin"), c.catDelete);

// Transactions
router.get("/transactions", authorizeRoles("admin","bendahara","sekretaris"), c.txList);
router.post("/transactions", authorizeRoles("admin","bendahara"), c.txCreate);
router.put("/transactions/:id", authorizeRoles("admin","bendahara"), c.txUpdate);
router.delete("/transactions/:id", authorizeRoles("admin"), c.txDelete);

// Reports
router.get("/reports/monthly", authorizeRoles("admin","bendahara","sekretaris"), c.repMonthly);
router.get("/reports/category", authorizeRoles("admin","bendahara","sekretaris"), c.repCategory);

router.get("/reports/monthly/export-pdf", protect, authorizeRoles("admin","bendahara","sekretaris"), exportKeuanganPdf);

export default router;
