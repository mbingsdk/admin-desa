import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const refreshTokens = new Set(); // bisa diganti Redis nanti

// ✅ Registrasi user baru
export const registerUser = async ({ name, email, password, role }) => {
  const exist = await User.findOne({ email });
  if (exist) throw new Error("Email sudah terdaftar");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  return user;
};

// ✅ Login user & buat token JWT
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User tidak ditemukan");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password salah");

  const tokens = generateTokens(user);
  refreshTokens.add(tokens.refreshToken);

  return {
    ...tokens,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken || !refreshTokens.has(refreshToken)) throw new Error("Token tidak valid");

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newTokens = generateTokens(decoded);
    refreshTokens.add(newTokens.refreshToken);
    refreshTokens.delete(refreshToken);
    return newTokens;
  } catch {
    throw new Error("Refresh token tidak valid atau kadaluarsa");
  }
};

// ✅ Ambil profil user berdasarkan ID dari token
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User tidak ditemukan");
  return user;
};
