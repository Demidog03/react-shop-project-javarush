import {createAsyncThunk} from "@reduxjs/toolkit";
import type {LoginBody} from "../apis/auth.api.types.ts";
import authApi from "../apis/auth.api.ts";
import Cookies from 'js-cookie'

export const loginThunk = createAsyncThunk('auth/login', async (data: LoginBody) => {
    const loginResponse = await authApi.login(data)
    const token = loginResponse.token
    await cookieStore.set('token', token)

    const user = await authApi.getMe()
    return {
        token,
        user,
        message: loginResponse.message
    }
});

export const authInitThunk = createAsyncThunk('auth/init', async () => {
    const tokenItem = await cookieStore.get('token')

    let user = null
    if (tokenItem?.value) {
        user = await authApi.getMe()
    }

    return {
        token: tokenItem?.value,
        user
    }
})

export const authLogoutThunk = createAsyncThunk('auth/logout', async () => {
    let data

    if (Cookies.get('token')) {
        data = await authApi.logout()
    }

    return {
        message: data?.message || 'User logged out!'
    }
})