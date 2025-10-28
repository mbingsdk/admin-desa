import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pendudukReducer from "../features/penduduk/pendudukSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    penduduk: pendudukReducer,
  },
});
