import axios from "../../utils/axiosInstance";

const list = async (params) => (await axios.get("/surat", { params })).data;
const create = async (data) => (await axios.post("/surat", data)).data;
const update = async (id, data) => (await axios.put(`/surat/${id}`, data)).data;
const remove = async (id) => (await axios.delete(`/surat/${id}`)).data;
const printPdf = (id) => `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/surat/${id}/print`;

export default { list, create, update, remove, printPdf };
