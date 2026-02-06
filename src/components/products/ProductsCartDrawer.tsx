import {Offcanvas} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";
import type {Product} from "./products.types.ts";

interface ProductsCartDrawerProps {
    open: boolean
    handleClose: () => void
}

function ProductsCartDrawer({ open, handleClose }: ProductsCartDrawerProps) {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const { productsIdsInCart } = useContext(ProductsCartContext)

    async function fetchProductsFromCart(ids: number[]) {
        try {
            const promises: Promise<Response>[] = []
            const products: Product[] = []

            ids.forEach((id) => {
                promises.push(fetch(`https://fakestoreapi.com/products/${id}`))
            })

            await Promise.all(promises).then(async (response) => {
                for (const response1 of response) {
                    const data = await response1.json()
                    products.push(data as Product)
                }
            })

            setCartProducts(products)
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(cartProducts)

    useEffect(() => {
        if (open) {
            void fetchProductsFromCart(productsIdsInCart)
        }
    }, [productsIdsInCart, open]);

    return (
        <Offcanvas show={open} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Products Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartProducts.map(product => <p>{product.title}</p>)}
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ProductsCartDrawer;