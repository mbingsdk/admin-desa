import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./suratService";

export const fetchSurat = createAsyncThunk("surat/fetch", api.list);
export const createSurat = createAsyncThunk("surat/create", api.create);
export const updateSurat = createAsyncThunk("surat/update", async ({id, data}) => api.update(id, data));
export const deleteSurat = createAsyncThunk("surat/delete", async (id) => { await api.remove(id); return id; });

const slice = createSlice({
  name: "surat",
  initialState: { items: [], total: 0, page: 1, limit: 20, loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchSurat.pending, (s)=>{s.loading=true;})
     .addCase(fetchSurat.fulfilled,(s,a)=>{s.loading=false; s.items=a.payload.data; s.total=a.payload.total; s.page=a.payload.page; s.limit=a.payload.limit;})
     .addCase(createSurat.fulfilled,(s,a)=>{s.items.unshift(a.payload);})
     .addCase(updateSurat.fulfilled,(s,a)=>{s.items=s.items.map(x=>x._id===a.payload._id?a.payload:x);})
     .addCase(deleteSurat.fulfilled,(s,a)=>{s.items=s.items.filter(x=>x._id!==a.payload);});
  }
});

export default slice.reducer;
