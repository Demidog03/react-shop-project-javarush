import {Button, Card} from "react-bootstrap";
import classes from "./Products.module.css";
import {BsCartDashFill, BsCartPlusFill} from "react-icons/bs";
import {Rating} from "@smastrom/react-rating";
import {useNavigate} from "react-router";

interface ProductCardProps {
    id: number
    title: string
    image: string
    description: string
    rating: number
    price: number
    isInCart: boolean
    addToCart: (id: number) => void
    removeFromCart: (id: number) => void
}

function ProductCard({ title, image, description, id, addToCart, isInCart, removeFromCart, rating, price }: ProductCardProps) {
    const navigate = useNavigate()

    function openDetailsPage() {
        navigate(`/product-details/${id}`)
    }

    return (
        <Card style={{ cursor: "pointer" }} onClick={openDetailsPage}>
            <Card.Img style={{ padding: 10, height: 300, objectFit: "contain" }} variant="top" src={image} />
            <Card.Body className={classes.cardBody}>
                <Card.Title className={classes.cardTitle}>{title}</Card.Title>
                <Card.Text className={classes.cardDescription}>
                    {description}
                </Card.Text>
                <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <div className={classes.cardPriceAndRating}>
                        <span className={classes.cardPrice}>
                            ${price}
                        </span>
                        <span className={classes.cardPriceFake}>
                            ${(price * 1.5).toFixed(2)}
                        </span>
                    </div>
                    <Rating
                        style={{ width: '50%', maxWidth: 200 }}
                        value={rating}
                        readOnly
                    />
                    {isInCart
                        ?
                        <Button
                            onClick={(event) => {
                                event.stopPropagation()
                                removeFromCart(id)
                            }}
                            className={classes.cardButton}
                            variant="danger"
                        >
                            <BsCartDashFill /> Remove from cart
                        </Button>
                        :
                        <Button
                            onClick={(event) => {
                                event.stopPropagation()
                                addToCart(id)
                            }}
                            className={classes.cardButton}
                            variant="primary"
                        >
                            <BsCartPlusFill /> Add to cart
                        </Button>
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;