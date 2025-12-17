import axios from "../../utils/axiosInstance";
const getStats = async () => (await axios.get("/dashboard")).data;
export default { getStats };
