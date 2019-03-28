import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("Unexpected error occured");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};
