import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

/**
 * Initial State
 * Jangan percaya cookie untuk auth state
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,        // ⬅️ hanya untuk login action
  isBootstrapping: true,   // ⬅️ INI KUNCI
  error: null,
};

/**
 * LOGIN
 */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login gagal"
      );
    }
  }
);

/**
 * BOOTSTRAP AUTH (dipanggil sekali saat app load)
 * - cek session via /auth/profile
 * - interceptor akan auto refresh token kalau perlu
 */
export const bootstrapAuth = createAsyncThunk(
  "auth/bootstrap",
  async (_, thunkAPI) => {
    try {
      const user = await authService.getProfile();
      return user;
    } catch {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

/**
 * LOGOUT
 */
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* =====================
         LOGIN
      ===================== */
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      /* =====================
         BOOTSTRAP AUTH
      ===================== */
      .addCase(bootstrapAuth.pending, (state) => {
        state.isBootstrapping = true;
      })

      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.isBootstrapping = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })

      .addCase(bootstrapAuth.rejected, (state) => {
        // ❗ JANGAN logout
        state.isBootstrapping = false;
      })

      /* =====================
         LOGOUT
      ===================== */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
