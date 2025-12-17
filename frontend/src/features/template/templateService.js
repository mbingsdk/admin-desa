import instance from "../../utils/axiosInstance";

const list = (params) => instance.get("/template-surat", { params }).then(r=>r.data);
const getOne = (id) => instance.get(`/template-surat/${id}`).then(r=>r.data);
const create = (d) => instance.post("/template-surat", d).then(r=>r.data);
const update = (id,d) => instance.put(`/template-surat/${id}`, d).then(r=>r.data);
const remove = (id) => instance.delete(`/template-surat/${id}`);

export default { list, getOne, create, update, remove };
