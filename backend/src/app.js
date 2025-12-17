import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import pendudukRoutes from './routes/penduduk.routes.js';
import authRoutes from "./routes/auth.routes.js";
import suratRoutes from "./routes/surat.routes.js";
import templateRoutes from "./routes/templateSurat.routes.js";
import keuanganRoutes from "./routes/keuangan.routes.js";
import arsipRoutes from "./routes/arsip.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import auditRoutes from "./routes/audit.routes.js";

dotenv.config();
connectDB();

const allowedOrigins = [
  process.env.NODE_ENV === 'development' && process.env.FRONTEND_URL,
  // "https://roblox.mbingsdk.my.id"
].filter(Boolean);

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn('Blocked CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => res.send("API Kantor Desa aktif ✅"));
app.use('/api/penduduk', pendudukRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/surat", suratRoutes);
app.use("/api/template-surat", templateRoutes);
app.use("/api/keuangan", keuanganRoutes);
app.use("/api/arsip", arsipRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/audit", auditRoutes);

app.use("/uploads", express.static("uploads")); // supaya file bisa diakses langsung
app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));

export default app;
