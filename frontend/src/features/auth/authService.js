import instance from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const login = async (credentials) => {
  const res = await instance.post("/auth/login", credentials);
  if (res.data.accessToken) {
    Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 }); // 1 jam
  }
  return res.data;
};

const getProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data.user;
};

// Func Nganggur nih
const refresh = async () => {
  const res = await instance.post("/auth/refresh");
  if (res.data.accessToken) {
    Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 });
  }
  return res.data.accessToken;
};

const logout = () => {
  Cookies.remove("accessToken");
};

export default { login, getProfile, refresh, logout };
