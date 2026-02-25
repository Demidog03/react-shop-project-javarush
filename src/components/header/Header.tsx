import classes from './Header.module.css'
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap";
import {BsCartFill} from "react-icons/bs";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {BiSolidMoon, BiSolidSun} from "react-icons/bi";
import {changeTheme} from "../../slices/theme-slice.ts";
import {useEffect} from "react";

interface HeaderProps {
    openCartDrawer: () => void
}

function Header({ openCartDrawer }: HeaderProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {productsIdsInCart} = useAppSelector(state => state.cart);
    const { theme } = useAppSelector(state => state.theme)

    function goHome() {
        navigate('/')
    }

    function goToSignInPage() {
        navigate('/sign-in')
    }

    function loadProductsPage() {
        import('../../pages/products/ProductsPage.tsx')
    }

    function handleChangeTheme(theme: 'light' | 'dark') {
        dispatch(changeTheme(theme))
    }

    useEffect(() => {
        document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', theme)
    }, [theme])

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onMouseEnter={loadProductsPage} onClick={goHome} style={{ cursor: 'pointer' }}>Shop.com</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        {theme === 'dark' && (
                            <Button className={classes.cartButton} onClick={() => handleChangeTheme('light')} variant="outline-primary">
                                <BiSolidSun size="25" />
                            </Button>
                        )}
                        {theme === 'light' && (
                            <Button className={classes.cartButton} onClick={() => handleChangeTheme('dark')} variant="outline-primary">
                                <BiSolidMoon size="25" />
                            </Button>
                        )}
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