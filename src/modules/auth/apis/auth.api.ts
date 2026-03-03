import axios from "axios";
import type {GetMeResponse, LoginBody, LoginResponse, RegisterBody, RegisterResponse} from "./auth.api.types.ts";

async function login(body: LoginBody): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>('http://localhost:3333/api/v1/auth/login', body)
    return response.data
}

async function register(body: RegisterBody): Promise<RegisterResponse> {
    const response = await axios.post<RegisterResponse>('http://localhost:3333/api/v1/auth/register', body)
    return response.data
}

async function getMe(token: string): Promise<GetMeResponse> {
    const response = await axios.get<GetMeResponse>('http://localhost:3333/api/v1/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

const authApi = { login, register, getMe }

export default authApi