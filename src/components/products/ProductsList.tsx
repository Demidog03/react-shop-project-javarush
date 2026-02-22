import classes from './Products.module.css'
import {Spinner} from "react-bootstrap";
import {useContext} from "react";
import ProductCard from "./ProductCard.tsx";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";
import useGetProductsQuery from "../../queries/products/useGetProductsQuery.tsx";

function ProductList() {
    const { data: products, isLoading: productsLoading } = useGetProductsQuery()
    const { productsIdsInCart, addProductsToCart, removeProductsFromCart } = useContext(ProductsCartContext)

    function addToCart(id: number) {
        addProductsToCart(id)

        // меняю поле isInCart у конкретного продукта в массиве products
        // const foundProduct = products.find(d => d.id === id)
        // if (foundProduct) {
        //     foundProduct.isInCart = true
        // }
        // setProducts([...products])
    }

    function removeFromCart(id: number) {
        removeProductsFromCart(id)

        // меняю поле isInCart у конкретного продукта в массиве products
        // const foundProduct = products.find(d => d.id === id)
        // if (foundProduct) {
        //     foundProduct.isInCart = false
        // }
        // setProducts([...products])
    }

    return (
        <div className={classes.productsListContainer}>
            <h1 className={classes.title}>Products</h1>

            <div className={classes.cardsContainer}>
                {productsLoading
                    ? <div className={classes.spinnerContainer}><Spinner animation="border" /></div>
                    : products?.map((p, index) => (
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