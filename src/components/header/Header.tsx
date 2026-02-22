import classes from './Header.module.css'
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap";
import {BsCartFill} from "react-icons/bs";
import {useContext} from "react";
import ProductsCartContext from "../../contexts/products-cart/ProductsCartContext.tsx";
import {useNavigate} from "react-router";

interface HeaderProps {
    openCartDrawer: () => void
}

function Header({ openCartDrawer }: HeaderProps) {
    const navigate = useNavigate()
    const {productsIdsInCart} = useContext(ProductsCartContext);

    function goHome() {
        navigate('/')
    }

    function goToSignInPage() {
        navigate('/sign-in')
    }

    function loadProductsPage() {
        import('../../pages/products/ProductsPage.tsx')
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onMouseEnter={loadProductsPage} onClick={goHome} style={{ cursor: 'pointer' }}>Shop.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        <Button className={classes.cartButton} onClick={openCartDrawer} variant="outline-primary">
                            <BsCartFill size="25" />
                            <Badge pill bg="danger">{productsIdsInCart.length}</Badge>
                        </Button>
                        <Button onClick={goToSignInPage} variant="primary">
                            Sign in
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header