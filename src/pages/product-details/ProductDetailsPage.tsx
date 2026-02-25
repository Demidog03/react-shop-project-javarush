import MainLayout from "../../layouts/MainLayout.tsx";
import {useParams} from "react-router";
import {useMemo} from "react";
import {Button, Card, Placeholder} from "react-bootstrap";
import classes from './ProductDetailsPage.module.css'
import {Rating} from "@smastrom/react-rating";
import {BsCartDashFill, BsCartPlusFill} from "react-icons/bs";
import useGetProductByIdQuery from "../../queries/products/useGetProductByIdQuery.tsx";
import {addProductsToCart, removeProductsFromCart} from "../../slices/cart-slice.ts";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";

function ProductDetailsPage() {
    const dispatch = useAppDispatch()
    const { productsIdsInCart } = useAppSelector(state => state.cart)
    const { id } = useParams()
    const { data: serverProduct, isLoading: loading } = useGetProductByIdQuery(id)
    const product = useMemo(() => {
        return { ...serverProduct, isInCart: productsIdsInCart.includes(serverProduct?.id ?? 0)}
    }, [productsIdsInCart, serverProduct])

    function removeFromCart(id: number | undefined) {
        if (id && product) {
            dispatch(removeProductsFromCart(id))
        }
    }

    function addToCart(id: number | undefined) {
        if (id && product) {
            dispatch(addProductsToCart(id))
        }
    }

    return (
        <MainLayout>
            <>
                {!loading && !product && (
                    <h1 style={{ textAlign: 'center' }}>Product not found</h1>
                )}
                {!loading && product && (
                        <Card className={classes.card}>
                            <Card.Img className={classes.image} variant="top" src={product?.image} />
                            <Card.Body className={classes.cardBody}>
                                <Card.Title>
                                    {product?.title}
                                </Card.Title>
                                <Card.Text>
                                    {product?.description}
                                </Card.Text>
                                <div className={classes.priceAndRatingContainer}>
                                    <Card.Text className={classes.priceContainer}>
                                        <span className={classes.price}>${product?.price}</span>
                                        <span className={classes.priceFake}>${product?.price ? (product.price * 1.5).toFixed(2) : ''}</span>
                                    </Card.Text>
                                    <Card.Text className={classes.ratingContainer}>
                                        <Rating
                                            style={{ width: '50%', maxWidth: 300 }}
                                            value={product?.rating?.rate ?? 0}
                                            readOnly
                                        />
                                        <span className={classes.ratingCount}>({product?.rating?.count})</span>
                                    </Card.Text>
                                </div>
                                {product?.isInCart
                                    ?
                                    <Button
                                        size="lg"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            removeFromCart(product?.id)
                                        }}
                                        className={classes.cardButton}
                                        variant="danger"
                                    >
                                        <BsCartDashFill /> Remove from cart
                                    </Button>
                                    :
                                    <Button
                                        size="lg"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            addToCart(product?.id)
                                        }}
                                        className={classes.cardButton}
                                        variant="primary"
                                    >
                                        <BsCartPlusFill /> Add to cart
                                    </Button>
                                }
                            </Card.Body>
                        </Card>
                    )
                }
                {loading && (
                        <Card className={classes.card}>
                            <Card.Body>
                                <Placeholder animation="glow" className={classes.cardSkeleton}>
                                    <Placeholder xs={12} style={{ height: 400 }} />
                                    <Placeholder xs={8} style={{ height: 50 }} />
                                    <Placeholder xs={12} style={{ height: 100 }} />
                                    <Placeholder xs={7} style={{ height: 70 }} />
                                    <Placeholder.Button xs={3} style={{ height: 50 }} />
                                </Placeholder>
                            </Card.Body>
                        </Card>
                    )
                }
            </>
        </MainLayout>
    );
}

export default ProductDetailsPage;