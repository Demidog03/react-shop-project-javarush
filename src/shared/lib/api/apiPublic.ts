import axios from "axios";
import toast from "react-hot-toast";

const apiPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiPublic.interceptors.response.use(response => response, (error) => {
    if (error) {
        for (const err of error.response?.data?.errors || []) {
            if (err.message) {
                toast.error(err.message)
            }
        }
    }
    return Promise.reject(error);
})

export default apiPublic
