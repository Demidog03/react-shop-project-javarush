import {Button, Card} from "react-bootstrap";
import classes from "./Products.module.css";
import {BsCartDashFill, BsCartPlusFill} from "react-icons/bs";

interface ProductCardProps {
    id: number
    title: string
    image: string
    description: string
    isInCart: boolean
    addToCart: (id: number) => void
    removeFromCart: (id: number) => void
}

function ProductCard({ title, image, description, id, addToCart, isInCart, removeFromCart }: ProductCardProps) {
    return (
        <Card>
            <Card.Img style={{ padding: 10, height: 300, objectFit: "contain" }} variant="top" src={image} />
            <Card.Body className={classes.cardBody}>
                <Card.Title className={classes.cardTitle}>{title}</Card.Title>
                <Card.Text className={classes.cardDescription}>
                    {description}
                </Card.Text>
                {isInCart
                    ?
                    <Button
                        onClick={() => removeFromCart(id)}
                        className={classes.cardButton}
                        variant="danger"
                    >
                        <BsCartDashFill /> Remove from cart
                    </Button>
                    :
                    <Button
                        onClick={() => addToCart(id)}
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

export default ProductCard;