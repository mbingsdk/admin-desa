import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./arsipService";

export const fetchArsip = createAsyncThunk("arsip/fetch", api.list);
export const uploadArsip = createAsyncThunk("arsip/upload", api.upload);
export const deleteArsip = createAsyncThunk("arsip/delete", async (id)=>{ await api.remove(id); return id; });

const slice = createSlice({
  name: "arsip",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchArsip.pending, (s)=>{s.loading=true;})
     .addCase(fetchArsip.fulfilled, (s,a)=>{s.loading=false; s.items=a.payload;})
     .addCase(fetchArsip.rejected, (s)=>{s.loading=false;})
     .addCase(uploadArsip.fulfilled, (s,a)=>{s.items.unshift(a.payload);})
     .addCase(deleteArsip.fulfilled, (s,a)=>{s.items=s.items.filter(i=>i._id!==a.payload);});
  }
});

export default slice.reducer;
