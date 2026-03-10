import type {
    GetMeResponse,
    LoginBody,
    LoginResponse,
    LogoutResponse,
    RegisterBody,
    RegisterResponse
} from "./auth.api.types.ts";
import apiPublic from "../../../shared/lib/api/apiPublic.ts";
import apiPrivate from "../../../shared/lib/api/apiPrivate.ts";
import Cookies from "js-cookie";

async function login(body: LoginBody): Promise<LoginResponse> {
    const response = await apiPublic.post<LoginResponse>('/auth/login', body)
    return response.data
}

async function register(body: RegisterBody): Promise<RegisterResponse> {
    const response = await apiPublic.post<RegisterResponse>('/auth/register', body)
    return response.data
}

async function getMe(): Promise<GetMeResponse> {
    const response = await apiPrivate.get<GetMeResponse>('/users/me')
    return response.data
}

async function logout(): Promise<LogoutResponse> {
    const response = await apiPrivate.get<LogoutResponse>('/auth/logout')
    Cookies.remove('token')
    return response.data
}

const authApi = { login, register, getMe, logout }

export default authApi