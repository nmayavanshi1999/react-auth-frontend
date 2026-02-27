import axios from "axios";


const instance = axios.create({
    baseURL: "https://fullstack-auth-backend.onrender.com/api/",
    headers: { "Content-Type": "application/json" } // “Bhai, hum JSON bhej rahe hain”
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