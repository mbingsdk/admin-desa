import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach Bearer token
instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==================================================
// REFRESH TOKEN LOGIC — FIXED
// ==================================================

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // If token expired
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Wait until refresh done
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            original.headers.Authorization = "Bearer " + token;
            return instance(original);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshRes = await axios.post(
          baseURL + "/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        Cookies.set("accessToken", newToken, { expires: 1 / 24 });

        instance.defaults.headers.common.Authorization = "Bearer " + newToken;
        processQueue(null, newToken);

        return instance(original);
      } catch (error) {
        processQueue(error, null);
        Cookies.remove("accessToken");
        // window.location.href = "/login";

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
