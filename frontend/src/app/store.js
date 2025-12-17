import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import pendudukReducer from "../features/penduduk/pendudukSlice";
import templateReducer from "../features/template/templateSlice";
import suratReducer from "../features/surat/suratSlice";
import keuReducer from "../features/keuangan/keuSlice";
import arsipReducer from "../features/arsip/arsipSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    penduduk: pendudukReducer,
    template: templateReducer,
    surat: suratReducer,
    keu: keuReducer,
    arsip: arsipReducer,
    dashboard: dashboardReducer,
  },
});
