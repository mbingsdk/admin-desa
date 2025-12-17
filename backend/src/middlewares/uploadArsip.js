import multer from "multer";
import path from "path";
import fs from "fs";

const dir = "uploads/arsip";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});

export const uploadArsip = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
}).single("file");
