import ProductsCartContext from "./ProductsCartContext.tsx";
import {type JSX, type ReactNode, useState} from "react";

interface ProductsCartProviderProps {
    children: ReactNode | JSX.Element;
}

function ProductsCartProvider({ children }: ProductsCartProviderProps) {
    const [productsIdsInCart, setProductsIdsInCart] = useState<number[]>([])

    function addProductsToCart(id: number) {
        const alreadyInCart = productsIdsInCart.some(productId => productId === id)

        if (alreadyInCart) {
            return
        }
        // добавляем id продукта в корзину
        setProductsIdsInCart([...productsIdsInCart, id])
    }

    function removeProductsFromCart(id: number) {
        // убираем id продукта из корзины
        setProductsIdsInCart(productsIdsInCart.filter(productId => productId !== id))
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