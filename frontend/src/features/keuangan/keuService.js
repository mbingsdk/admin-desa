import axios from "../../utils/axiosInstance";

const listCategories = async () => (await axios.get("/keuangan/categories")).data;
const createCategory = async (d) => (await axios.post("/keuangan/categories", d)).data;
const updateCategory = async (id,d) => (await axios.put(`/keuangan/categories/${id}`, d)).data;
const deleteCategory = async (id) => (await axios.delete(`/keuangan/categories/${id}`)).data;

const listTransactions = async (params) => (await axios.get("/keuangan/transactions", { params })).data;
const createTransaction = async (d) => (await axios.post("/keuangan/transactions", d)).data;
const updateTransaction = async (id,d) => (await axios.put(`/keuangan/transactions/${id}`, d)).data;
const deleteTransaction = async (id) => (await axios.delete(`/keuangan/transactions/${id}`)).data;

const monthlyReport = async (year) => (await axios.get("/keuangan/reports/monthly", { params: { year } })).data;
const categoryReport = async (year) => (await axios.get("/keuangan/reports/category", { params: { year } })).data;

export default {
  listCategories, createCategory, updateCategory, deleteCategory,
  listTransactions, createTransaction, updateTransaction, deleteTransaction,
  monthlyReport, categoryReport
};
