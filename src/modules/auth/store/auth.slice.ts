import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {authInitThunk, authLogoutThunk, loginThunk} from "./auth.thunks.ts";
import type {CurrentUser} from "../apis/auth.api.types.ts";
import toast from "react-hot-toast";

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

            if (action.payload.message) {
                toast.success(action.payload.message)
            }
        })
            .addCase(loginThunk.pending, (state) => {
                state.loginLoading = true
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
            .addMatcher(authLogoutThunk.settled, (state, action) => {
                state.token = null
                state.currentUser = null
                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (action?.payload?.message) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    toast.success(action.payload.message)
                }
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