import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import pendudukRoutes from './routes/penduduk.routes.js';
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.send("API Kantor Desa aktif ✅"));
app.use('/api/penduduk', pendudukRoutes);
app.use("/api/auth", authRoutes);
app.use((req, res) => res.status(404).json({ message: 'Endpoint tidak ditemukan' }));

export default app;
