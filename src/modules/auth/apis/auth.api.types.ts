export interface LoginResponse {
    type: string
    token: string
}

export interface LoginBody {
    email: string
    password: string
}

export interface RegisterBody {
    fullName: string
    email: string
    password: string
    password_confirmation: string
}

export interface RegisterResponse {
    message: string
}
