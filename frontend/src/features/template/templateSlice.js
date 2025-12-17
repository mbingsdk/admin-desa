import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./templateService";

export const fetchTemplates = createAsyncThunk("tpl/fetch", api.list);
export const addTemplate = createAsyncThunk("tpl/add", api.create);
export const editTemplate = createAsyncThunk("tpl/edit", async ({id,data})=>api.update(id,data));
export const deleteTemplate = createAsyncThunk("tpl/del", async (id)=>{ await api.remove(id); return id; });

const slice = createSlice({
  name: "templateSurat",
  initialState: { items: [], loading:false },
  reducers: {},
  extraReducers: (b)=>{
    b.addCase(fetchTemplates.pending, s=>{s.loading=true;})
     .addCase(fetchTemplates.fulfilled,(s,a)=>{s.loading=false; s.items=a.payload;})
     .addCase(addTemplate.fulfilled,(s,a)=>{s.items.unshift(a.payload);})
     .addCase(editTemplate.fulfilled,(s,a)=>{s.items=s.items.map(x=>x._id===a.payload._id?a.payload:x);})
     .addCase(deleteTemplate.fulfilled,(s,a)=>{s.items=s.items.filter(x=>x._id!==a.payload);});
  }
});
export default slice.reducer;
