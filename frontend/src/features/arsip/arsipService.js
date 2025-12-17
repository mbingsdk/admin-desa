import axios from "../../utils/axiosInstance";

const list = async (params) => (await axios.get("/arsip", { params })).data;
const upload = async (formData) => (await axios.post("/arsip", formData, { headers: { "Content-Type": "multipart/form-data" } })).data;
const remove = async (id) => (await axios.delete(`/arsip/${id}`)).data;
const download = (id) => `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/arsip/${id}/download`;

export default { list, upload, remove, download };
