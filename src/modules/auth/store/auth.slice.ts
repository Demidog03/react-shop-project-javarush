import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loginThunk} from "./auth.thunks.ts";

interface AuthSliceState {
    token: string | null
    currentUser: string | null,
    loginLoading: boolean
}

const initialState: AuthSliceState = {
    token: null,
    currentUser: null,
    loginLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload.token
        })
            .addCase(loginThunk.pending, (state) => {
                state.loginLoading = true
            })
            .addCase(loginThunk.rejected, () => {
                alert('Login failed')
            })
            .addMatcher(loginThunk.settled, (state) => {
                state.loginLoading = false
            })
    }
})

export const {addToken, clearToken} = authSlice.actions

export default authSlice.reducer