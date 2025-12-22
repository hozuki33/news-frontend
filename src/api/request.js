// src/api/request.js
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080", // 后端地址
  timeout: 5000
});

// 请求拦截器
request.interceptors.request.use(config => {
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data; // 后端返回 {code, msg, data}
  },
  err => {
    console.error("API Error:", err);
    return Promise.reject(err);
  }
);

export default request;
