import {type JSX, useState} from "react";
import classes from "./MainLayout.module.css";
import Header from "../modules/header/ui/Header.tsx";
import ProductsCartDrawer from "../modules/products/ui/ProductsCartDrawer.tsx";

function MainLayout({ children }: { children: JSX.Element }) {
    const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false)

    function openCartDrawer() {
        setCartDrawerOpen(true)
    }

    function closeCartDrawer() {
        setCartDrawerOpen(false)
    }

    return (
        <>
            <Header openCartDrawer={openCartDrawer} />
            <div className={classes.main}>
                {children}
            </div>
            <ProductsCartDrawer open={cartDrawerOpen} handleClose={closeCartDrawer}/>
        </>
    );
}

export default MainLayout;