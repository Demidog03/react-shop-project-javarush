import ProductsCartContext from "./ProductsCartContext.tsx";
import {type JSX, type ReactNode, useState} from "react";
import StorageService from "../../services/storageService.ts";

interface ProductsCartProviderProps {
    children: ReactNode | JSX.Element;
}

const storageService = new StorageService()

function ProductsCartProvider({ children }: ProductsCartProviderProps) {
    const initialValue = storageService.get('productsIdsInCart') || [] as number[]
    const [productsIdsInCart, setProductsIdsInCart] = useState<number[]>(initialValue)

    function addProductsToCart(id: number) {
        const alreadyInCart = productsIdsInCart.some(productId => productId === id)

        if (alreadyInCart) {
            return
        }
        // добавляем id продукта в корзину
        const newProductsIdsInCart = [...productsIdsInCart, id]
        storageService.set('productsIdsInCart', JSON.stringify(newProductsIdsInCart))
        setProductsIdsInCart(newProductsIdsInCart)
    }

    function removeProductsFromCart(id: number) {
        const filteredProductsIdsInCart = productsIdsInCart.filter(productId => productId !== id)

        // убираем id продукта из корзины
        storageService.set('productsIdsInCart', JSON.stringify(filteredProductsIdsInCart))
        setProductsIdsInCart(filteredProductsIdsInCart)
    }

    return (
        <ProductsCartContext.Provider value={{
            productsIdsInCart,
            setProductsIdsInCart,
            addProductsToCart,
            removeProductsFromCart
        }}>
            {children}
        </ProductsCartContext.Provider>
    )
}

export default ProductsCartProvider;