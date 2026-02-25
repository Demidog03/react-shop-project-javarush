import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import cartReducer from "../slices/cart-slice.ts";
import themeReducer from "../slices/theme-slice.ts";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        theme: themeReducer

    } // reducer => slice
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()