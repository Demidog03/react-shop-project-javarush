import {createContext, type Dispatch, type SetStateAction} from "react";

export interface ProductsCartContextData {
    productsIdsInCart: number[]
    setProductsIdsInCart: Dispatch<SetStateAction<number[]>>
    addProductsToCart: (id: number) => void
    removeProductsFromCart: (id: number) => void
}

const ProductsCartContext = createContext<ProductsCartContextData>({
    productsIdsInCart: [],
    setProductsIdsInCart: () => {},
    addProductsToCart: () => {},
    removeProductsFromCart: () => {},
})

export default ProductsCartContext