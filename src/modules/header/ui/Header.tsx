import classes from './Header.module.css'
import {Badge, Button, Container, Nav, Navbar} from "react-bootstrap";
import {BsCartFill} from "react-icons/bs";
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {BiSolidExit, BiSolidMoon, BiSolidSun} from "react-icons/bi";
import {changeTheme} from "../../theme/store/theme-slice.ts";
import {useEffect} from "react";
import {authLogoutThunk} from "../../auth/store/auth.thunks.ts";
import authApi from "../../auth/apis/auth.api.ts";

interface HeaderProps {
    openCartDrawer: () => void
}

function Header({ openCartDrawer }: HeaderProps) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {productsIdsInCart} = useAppSelector(state => state.cart);
    const { theme } = useAppSelector(state => state.theme)
    const { currentUser } = useAppSelector(state => state.auth)

    function goHome() {
        navigate('/')
    }

    function goToSignInPage() {
        navigate('/sign-in')
    }

    function loadProductsPage() {
        import('../../../pages/products/ProductsPage.tsx')
    }

    function handleChangeTheme(theme: 'light' | 'dark') {
        dispatch(changeTheme(theme))
    }

    function handleClickLogout() {
        dispatch(authLogoutThunk())
    }

    function test401() {
        authApi.getMe()
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
                        {currentUser && (
                            <Button className={classes.cartButton} onClick={openCartDrawer} variant="outline-primary">
                                <BsCartFill size="25" />
                                <Badge pill bg="danger">{productsIdsInCart.length}</Badge>
                            </Button>
                        )}
                        {/*<Button onClick={test401} variant="primary">*/}
                        {/*    Test 401*/}
                        {/*</Button>*/}
                        {!currentUser && (
                            <Button onClick={goToSignInPage} variant="primary">
                                Sign in
                            </Button>
                        )}
                        {currentUser && (
                            <Button className={classes.logoutButton} onClick={handleClickLogout} variant="warning">
                                <BiSolidExit size="20"/>
                                <span>Logout</span>
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header