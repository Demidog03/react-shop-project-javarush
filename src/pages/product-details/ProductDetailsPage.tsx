import MainLayout from "../../layouts/MainLayout.tsx";
import {useParams} from "react-router";
import {useContext, useEffect, useState} from "react";
import type {Product} from "../../components/products/products.types.ts";
import {Button, Card, Placeholder} from "react-bootstrap";
import classes from './ProductDetailsPage.module.css'
import {Rating} from "@smastrom/react-rating";
import {BsCartDashFill, BsCartPlusFill} from "react-icons/bs";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";

function ProductDetailsPage() {
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(false)
    const { productsIdsInCart, addProductsToCart, removeProductsFromCart } = useContext(ProductsCartContext)
    const { id } = useParams()

    async function fetchProduct(id: string) {
        try {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json() as Product
            setProduct({ ...data, isInCart: productsIdsInCart.includes(data.id) })
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    function removeFromCart(id: number | undefined) {
        if (id && product) {
            removeProductsFromCart(id)
            product.isInCart = false
            setProduct({ ...product })
        }
    }

    function addToCart(id: number | undefined) {
        if (id && product) {
            addProductsToCart(id)
            product.isInCart = true
            setProduct({ ...product })
        }
    }

    useEffect(() => {
        if (id) {
            void fetchProduct(id)
        }
    }, [id])

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
                                            value={product?.rating.rate ?? 0}
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