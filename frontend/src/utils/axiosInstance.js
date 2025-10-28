import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
  withCredentials: true,
});

// Tambahkan Authorization header otomatis
instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tangani auto refresh token saat 401
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshRes = await axios.post("/auth/refresh", {}, { withCredentials: true });
        Cookies.set("accessToken", refreshRes.data.accessToken, { expires: 1 / 24 });
        original.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
        return instance(original);
      } catch (refreshErr) {
        Cookies.remove("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
