import {Badge, ListGroup, Offcanvas, Placeholder} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";
import type {Product} from "./products.types.ts";
import classes from "./Products.module.css";

interface ProductsCartDrawerProps {
    open: boolean
    handleClose: () => void
}

function ProductsCartDrawer({ open, handleClose }: ProductsCartDrawerProps) {
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const { productsIdsInCart } = useContext(ProductsCartContext)
    const [productsLoading, setProductsLoading] = useState<boolean>(false)

    async function fetchProductsFromCart(ids: number[]) {
        try {
            setProductsLoading(true)
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
        finally {
            setProductsLoading(false)
        }
    }

    console.log(productsLoading)

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
                <ListGroup as="ol" numbered>
                    {productsLoading && (
                        Array.from({length: productsIdsInCart.length}).map((_, index) => (
                            <ListGroup.Item
                                key={index}
                                as="li"
                                className="d-flex justify-content-between align-items-center"
                            >
                                <Placeholder as="div" animation="glow" className={classes.productCartItemContentPlaceholder}>
                                    <Placeholder xs={2} style={{ height: 60 }} />
                                    <div style={{ width: '60%' }} >
                                        <Placeholder style={{ marginBottom: 4, height: 30 }} xs={12} />
                                        <Placeholder style={{ height: 20 }} xs={12} />
                                    </div>
                                </Placeholder>
                                <Placeholder as="div" animation="glow" style={{ width: 20 }} >
                                    <Placeholder xs={12} />
                                </Placeholder>
                            </ListGroup.Item>
                        ))
                    )}
                    {!productsLoading && cartProducts.map((product, index) => (
                        <ListGroup.Item
                            key={index}
                            as="li"
                            className="d-flex justify-content-between align-items-center"
                        >
                            <div className={classes.productCartItemContent}>
                                <img className={classes.productCartItemImage} src={product.image} alt={product.title}/>
                                <div className="ms-2 me-auto">
                                    <div className={classes.productCartItemTitle}>{product.title}</div>
                                    <span className={classes.productCartItemPrice}>${product.price} <span className={classes.productCartItemPriceFake}>${product.price * 1.5}</span></span>
                                </div>
                            </div>
                            <Badge bg="primary" pill>
                                1
                            </Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ProductsCartDrawer;