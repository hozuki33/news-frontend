import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000
});

// 请求拦截器（重点）
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data; // { code, msg, data }
  },
  err => {
    console.error("API Error:", err);

    // 可选：统一处理未登录
    if (err.response && err.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default request;
