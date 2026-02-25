import {Badge, ListGroup, Offcanvas, Placeholder} from "react-bootstrap";
import classes from "./Products.module.css";
import {useNavigate} from "react-router";
import useGetProductsByIdsQuery from "../../queries/products/useGetProductsByIdsQuery.tsx";
import {useAppSelector} from "../../store/store.ts";

interface ProductsCartDrawerProps {
    open: boolean
    handleClose: () => void
}

function ProductsCartDrawer({ open, handleClose }: ProductsCartDrawerProps) {
    const navigate = useNavigate()
    const { productsIdsInCart } = useAppSelector(state => state.cart)
    const cartProductsQueries = useGetProductsByIdsQuery(productsIdsInCart.map(id => id.toString()), open)

    const cartProducts = cartProductsQueries.map(q => q.data)
    const productsLoading = cartProductsQueries.some(q => q.isLoading)

    function goToDetailsPage(id: number) {
        navigate(`/product-details/${id}`)
        handleClose()
    }

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
                            onClick={() => goToDetailsPage(product?.id || 0)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className={classes.productCartItemContent}>
                                <img className={classes.productCartItemImage} src={product?.image} alt={product?.title}/>
                                <div className="ms-2 me-auto">
                                    <div className={classes.productCartItemTitle}>{product?.title}</div>
                                    <span className={classes.productCartItemPrice}>${product?.price} <span className={classes.productCartItemPriceFake}>${((product?.price || 0) * 1.5).toFixed(2)}</span></span>
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