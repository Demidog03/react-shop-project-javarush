import classes from './Header.module.css'
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap";
import {BsCartFill} from "react-icons/bs";
import {useContext} from "react";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";

interface HeaderProps {
    openCartDrawer: () => void
}

function Header({ openCartDrawer }: HeaderProps) {
    const {productsIdsInCart} = useContext(ProductsCartContext);

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Shop.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        <Button className={classes.cartButton} onClick={openCartDrawer} variant="outline-primary">
                            <BsCartFill size="25" />
                            <Badge pill bg="danger">{productsIdsInCart.length}</Badge>
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header