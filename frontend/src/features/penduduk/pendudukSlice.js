import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pendudukService from "./pendudukService";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// GET semua data
export const fetchPenduduk = createAsyncThunk(
  "penduduk/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await pendudukService.getAll();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal memuat data");
    }
  }
);

// CREATE
export const addPenduduk = createAsyncThunk(
  "penduduk/add",
  async (data, thunkAPI) => {
    try {
      return await pendudukService.create(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal menambah data");
    }
  }
);

// UPDATE
export const editPenduduk = createAsyncThunk(
  "penduduk/edit",
  async ({ id, data }, thunkAPI) => {
    try {
      return await pendudukService.update(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal mengubah data");
    }
  }
);

// DELETE
export const deletePenduduk = createAsyncThunk(
  "penduduk/delete",
  async (id, thunkAPI) => {
    try {
      await pendudukService.remove(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Gagal menghapus data");
    }
  }
);

const pendudukSlice = createSlice({
  name: "penduduk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPenduduk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPenduduk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPenduduk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addPenduduk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editPenduduk.fulfilled, (state, action) => {
        state.items = state.items.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(deletePenduduk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default pendudukSlice.reducer;
