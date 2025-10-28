import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: !!Cookies.get("accessToken"),
};

// Login
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    return await authService.login(credentials);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login gagal");
  }
});

// Get Profile
export const fetchProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
  try {
    return await authService.getProfile();
  } catch (err) {
    return thunkAPI.rejectWithValue("Gagal memuat profil");
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
