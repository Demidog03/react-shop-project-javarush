import {createAsyncThunk} from "@reduxjs/toolkit";
import type {LoginBody} from "../apis/auth.api.types.ts";
import authApi from "../apis/auth.api.ts";

export const loginThunk = createAsyncThunk('auth/login', async (data: LoginBody) => {
    const loginResponse = await authApi.login(data)
    const token = loginResponse.token
    await cookieStore.set('token', token)

    const user = await authApi.getMe(token)
    return {
        token,
        user
    }
});

export const authInitThunk = createAsyncThunk('auth/init', async () => {
    const tokenItem = await cookieStore.get('token')

    let user = null
    if (tokenItem?.value) {
        user = await authApi.getMe(tokenItem.value)
    }

    return {
        token: tokenItem?.value,
        user
    }
})