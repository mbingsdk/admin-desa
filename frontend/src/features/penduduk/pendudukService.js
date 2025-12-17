import axios from "../../utils/axiosInstance";

const getAll = async () => {
  const res = await axios.get("/penduduk");
  return res.data;
};

const create = async (data) => {
  const res = await axios.post("/penduduk", data);
  return res.data;
};

const update = async (id, data) => {
  const res = await axios.put(`/penduduk/${id}`, data);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`/penduduk/${id}`);
  return res.data;
};

export default { getAll, create, update, remove };
