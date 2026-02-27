import axios from "axios";
import type {LoginBody, LoginResponse, RegisterBody, RegisterResponse} from "./auth.api.types.ts";

async function login(body: LoginBody): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>('http://localhost:3333/api/v1/auth/login', body)
    return response.data
}

async function register(body: RegisterBody): Promise<RegisterResponse> {
    const response = await axios.post<RegisterResponse>('http://localhost:3333/api/v1/auth/register', body)
    return response.data
}

const authApi = { login, register }

export default authApi