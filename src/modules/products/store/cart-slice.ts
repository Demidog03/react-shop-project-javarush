import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import StorageService from "../../../services/storageService.ts";

interface CartSliceState {
    productsIdsInCart: number[]
}

const storageService = new StorageService()

const initialState: CartSliceState = {
    productsIdsInCart: storageService.get('productsIdsInCart') as number[]
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: { // actions - обращения
        addProductsToCart: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const alreadyInCart = state.productsIdsInCart.some(productId => productId === id)

            if (alreadyInCart) {
                return
            }
            // добавляем id продукта в корзину
            const newProductsIdsInCart = [...state.productsIdsInCart, id]
            storageService.set('productsIdsInCart', JSON.stringify(newProductsIdsInCart))
            state.productsIdsInCart = newProductsIdsInCart // setProductsIdsInCart(newProductsIdsInCart)
        },
        removeProductsFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const filteredProductsIdsInCart = state.productsIdsInCart.filter(productId => productId !== id)

            // убираем id продукта из корзины
            storageService.set('productsIdsInCart', JSON.stringify(filteredProductsIdsInCart))
            state.productsIdsInCart = filteredProductsIdsInCart
        }
    }
})

export const {addProductsToCart, removeProductsFromCart} = cartSlice.actions

export default cartSlice.reducer