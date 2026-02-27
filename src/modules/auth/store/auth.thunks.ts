import {createAsyncThunk} from "@reduxjs/toolkit";
import type {LoginBody} from "../apis/auth.api.types.ts";
import authApi from "../apis/auth.api.ts";

export const loginThunk = createAsyncThunk('auth/login', async (data: LoginBody) => {
    return await authApi.login(data)
});