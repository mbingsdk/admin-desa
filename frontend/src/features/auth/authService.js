import axios from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const login = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  if (res.data.accessToken) {
    Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 }); // 1 jam
  }
  return res.data;
};

const getProfile = async () => {
  const res = await axios.get("/auth/profile");
  return res.data.user;
};

const refresh = async () => {
  const res = await axios.post("/auth/refresh");
  if (res.data.accessToken) {
    Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 });
  }
  return res.data.accessToken;
};

const logout = () => {
  Cookies.remove("accessToken");
};

export default { login, getProfile, refresh, logout };
