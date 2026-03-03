import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {authInitThunk, loginThunk} from "./auth.thunks.ts";
import type {CurrentUser} from "../apis/auth.api.types.ts";

interface AuthSliceState {
    token: string | null
    currentUser: CurrentUser | null,
    loginLoading: boolean
    isInitialized: boolean
    initLoading: boolean
}

const initialState: AuthSliceState = {
    token: null,
    currentUser: null,
    loginLoading: false,
    isInitialized: false,
    initLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            void cookieStore.set('token', action.payload)
        },
        clearToken: (state) => {
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.token = action.payload.token
            state.currentUser = action.payload.user
        })
            .addCase(loginThunk.pending, (state) => {
                state.loginLoading = true
            })
            .addCase(loginThunk.rejected, () => {
                alert('Login failed')
            })
            .addCase(authInitThunk.fulfilled, (state, action) => {
                if (action.payload.token) {
                    state.token = action.payload.token
                }
                if (action.payload.user) {
                    state.currentUser = action.payload.user
                }
                state.isInitialized = true
            })
            .addCase(authInitThunk.pending, (state) => {
                state.initLoading = true
            })
            .addMatcher(authInitThunk.settled, (state) => {
                state.initLoading = false
            })
            .addMatcher(loginThunk.settled, (state) => {
                state.loginLoading = false
            })

    }
})

export const {addToken, clearToken} = authSlice.actions

export default authSlice.reducer