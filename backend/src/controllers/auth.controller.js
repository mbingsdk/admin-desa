import {
  registerUser,
  loginUser,
  getUserProfile,
  refreshAccessToken,
} from "../services/auth.service.js";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "Registrasi berhasil", user });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal registrasi" });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });
    res.json({
      message: "Login berhasil",
      accessToken: result.accessToken,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const newTokens = await refreshAccessToken(refreshToken);
    res.json(newTokens);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// GET /api/auth/me
export const getProfile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal mengambil profil" });
  }
};
