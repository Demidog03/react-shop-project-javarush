import classes from './Products.module.css'
import {Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import ProductCard from "./ProductCard.tsx";

interface Product {
    category: string;
    description: string;
    id: number
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    }
    title: string;
    isInCart: boolean;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [productsIdsInCart, setProductsIdsInCart] = useState<number[]>([])
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    console.log(products)
    console.log(productsIdsInCart)

    async function fetchProducts() {
        try {
            setProductsLoading(true)
            const response = await fetch("https://fakestoreapi.com/products")
            const data = await response.json() as Product[]
            setProducts(data.map(d => ({ ...d, isInCart: false })))
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
        const alreadyInCart = productsIdsInCart.some(productId => productId === id)

        if (alreadyInCart) {
            return
        }
        // добавляем id продукта в корзину
        setProductsIdsInCart([...productsIdsInCart, id])

        // меняю поле isInCart у конкретного продукта в массиве products
        const foundProduct = products.find(d => d.id === id)
        if (foundProduct) {
            foundProduct.isInCart = true
        }
        setProducts([...products])
    }

    function removeFromCart(id: number) {
        // убираем id продукта из корзины
        setProductsIdsInCart(productsIdsInCart.filter(productId => productId !== id))

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