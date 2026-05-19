import axios from "axios";


const instance = axios.create({
    baseURL: "https://fullstack-auth-backend-nz7a.onrender.com/api/",
    headers: { "Content-Type": "application/json" } 
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default instance