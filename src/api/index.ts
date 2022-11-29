import Axios from "axios";
import Constants from "expo-constants";
export default Axios.create({
  baseURL: Constants.manifest!.extra!.BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});
