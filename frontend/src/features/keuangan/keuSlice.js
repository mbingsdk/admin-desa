import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./keuService";

export const fetchCategories = createAsyncThunk("keu/cat", api.listCategories);
export const addCategory = createAsyncThunk("keu/catAdd", api.createCategory);
export const editCategory = createAsyncThunk("keu/catEdit", async ({id,data}) => api.updateCategory(id,data));
export const removeCategory = createAsyncThunk("keu/catDel", async (id)=>{ await api.deleteCategory(id); return id; });

export const fetchTransactions = createAsyncThunk("keu/tx", api.listTransactions);
export const addTransaction = createAsyncThunk("keu/txAdd", api.createTransaction);
export const editTransaction = createAsyncThunk("keu/txEdit", async ({id,data})=> api.updateTransaction(id,data));
export const removeTransaction = createAsyncThunk("keu/txDel", async (id)=>{ await api.deleteTransaction(id); return id; });

export const fetchMonthly = createAsyncThunk("keu/monthly", api.monthlyReport);
export const fetchCatReport = createAsyncThunk("keu/catReport", api.categoryReport);

const slice = createSlice({
  name: "keu",
  initialState: {
    categories: [],
    transactions: { data: [], total: 0, page: 1, limit: 20 },
    monthly: [],
    catReport: [],
    loading: false,
    error: null,
    filters: { type: "", categoryId: "", dateFrom: "", dateTo: "", q: "" },
  },
  reducers: {
    setFilters(state, action) { state.filters = { ...state.filters, ...action.payload }; }
  },
  extraReducers: (b) => {
    b
    // categories
    .addCase(fetchCategories.fulfilled, (s,a)=>{ s.categories = a.payload; })
    .addCase(addCategory.fulfilled, (s,a)=>{ s.categories.push(a.payload); })
    .addCase(editCategory.fulfilled, (s,a)=>{ s.categories = s.categories.map(c=>c._id===a.payload._id?a.payload:c); })
    .addCase(removeCategory.fulfilled, (s,a)=>{ s.categories = s.categories.filter(c=>c._id!==a.payload); })
    // transactions
    .addCase(fetchTransactions.pending, (s)=>{ s.loading=true; })
    .addCase(fetchTransactions.fulfilled, (s,a)=>{ s.loading=false; s.transactions = a.payload; })
    .addCase(fetchTransactions.rejected, (s,a)=>{ s.loading=false; s.error=a.payload; })
    .addCase(addTransaction.fulfilled, (s,a)=>{ s.transactions.data.unshift(a.payload); s.transactions.total+=1; })
    .addCase(editTransaction.fulfilled, (s,a)=>{ s.transactions.data = s.transactions.data.map(t=>t._id===a.payload._id?a.payload:t); })
    .addCase(removeTransaction.fulfilled, (s,a)=>{ s.transactions.data = s.transactions.data.filter(t=>t._id!==a.payload); s.transactions.total-=1; })
    // reports
    .addCase(fetchMonthly.fulfilled, (s,a)=>{ s.monthly = a.payload; })
    .addCase(fetchCatReport.fulfilled, (s,a)=>{ s.catReport = a.payload; });
  }
});

export const { setFilters } = slice.actions;
export default slice.reducer;
