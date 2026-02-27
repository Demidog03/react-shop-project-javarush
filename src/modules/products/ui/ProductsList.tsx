import classes from './Products.module.css'
import {Spinner} from "react-bootstrap";
import {useMemo} from "react";
import ProductCard from "./ProductCard.tsx";
import useGetProductsQuery from "../queries/useGetProductsQuery.tsx";
import {addProductsToCart, removeProductsFromCart} from "../store/cart-slice.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";

function ProductList() {
    const dispatch = useAppDispatch()
    const { data: serverProducts, isLoading: productsLoading } = useGetProductsQuery()
    const { productsIdsInCart } = useAppSelector(state => state.cart)
    const products = useMemo(() => {
        return serverProducts?.map(p => ({ ...p, isInCart: productsIdsInCart.includes(p.id) }))
    }, [productsIdsInCart, serverProducts])

    function addToCart(id: number) {
        dispatch(addProductsToCart(id))
    }

    function removeFromCart(id: number) {
        dispatch(removeProductsFromCart(id))
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