import classes from './Products.module.css'
import {Spinner} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";
import type {Product} from "./products.types.ts";

function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [productsLoading, setProductsLoading] = useState<boolean>(false)
    const { productsIdsInCart, addProductsToCart, removeProductsFromCart } = useContext(ProductsCartContext)

    async function fetchProducts() {
        try {
            setProductsLoading(true)
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json() as Product[]
            setProducts(data.map(d => ({ ...d, isInCart: productsIdsInCart.includes(d.id) })))
        } catch (err) {
            console.log(err)
        } finally {
            setProductsLoading(false)
        }
    }

    useEffect(() => {
        void fetchProducts()
    }, [])

    function addToCart(id: number) {
        addProductsToCart(id)

        // меняю поле isInCart у конкретного продукта в массиве products
        const foundProduct = products.find(d => d.id === id)
        if (foundProduct) {
            foundProduct.isInCart = true
        }
        setProducts([...products])
    }

    function removeFromCart(id: number) {
        removeProductsFromCart(id)

        // меняю поле isInCart у конкретного продукта в массиве products
        const foundProduct = products.find(d => d.id === id)
        if (foundProduct) {
            foundProduct.isInCart = false
        }
        setProducts([...products])
    }

    return (
        <div className={classes.productsListContainer}>
            <h1 className={classes.title}>Products</h1>

            <div className={classes.cardsContainer}>
                {productsLoading
                    ? <div className={classes.spinnerContainer}><Spinner animation="border" /></div>
                    : products.map((p, index) => (
                        <ProductCard
                            key={index}
                            id={p.id}
                            title={p.title}
                            image={p.image}
                            description={p.description}
                            rating={p.rating.rate}
                            price={p.price}
                            isInCart={p.isInCart}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList;