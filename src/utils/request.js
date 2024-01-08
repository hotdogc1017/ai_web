import axios from "axios";
import { MessageBox, Message } from "element-ui";
import router from "../router";
const service = axios.create({
  baseURL: "http://39.106.69.95:8099",
  // timeout: 12000
});

service.interceptors.request.use(
  (config) => {
    var token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Content-Type"] =
        config.contentType || "application/json;charset=UTF-8";
      config.headers.Authtoken = token;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  },
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  },
);

export default service;
