import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import cartReducer from "../modules/products/store/cart-slice.ts";
import themeReducer from "../modules/theme/store/theme-slice.ts";
import authReducer from "../modules/auth/store/auth.slice.ts";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        theme: themeReducer,
        auth: authReducer
    } // reducer => store
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()