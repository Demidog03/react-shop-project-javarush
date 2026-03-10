import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {store} from "../../../store/store.ts";
import {authLogoutThunk} from "../../../modules/auth/store/auth.thunks.ts";

const apiPrivate = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiPrivate.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

apiPrivate.interceptors.response.use(response => response, (error) => {
    if (error) {
        if (error.response?.status === 401) {
            Cookies.remove('token')
            store.dispatch(authLogoutThunk())
        }
        for (const err of error.response?.data?.errors || []) {
            if (err.message) {
                toast.error(err.message)
            }
        }
    }
    return Promise.reject(error);
})

export default apiPrivate
