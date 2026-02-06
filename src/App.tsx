import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from "./components/header/Header.tsx";
import ProductList from "./components/products/ProductsList.tsx";
import ProductsCartDrawer from "./components/products/ProductsCartDrawer.tsx";
import {useState} from "react";
import ProductsCartProvider from "./contexts/products-cart/ProductsCartProvider.tsx";

function App() {
    const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false)

    function openCartDrawer() {
        setCartDrawerOpen(true)
    }

    function closeCartDrawer() {
        setCartDrawerOpen(false)
    }

    return (
        <ProductsCartProvider>
            {/* children */}
            <Header openCartDrawer={openCartDrawer} />
            <ProductList/>
            <ProductsCartDrawer open={cartDrawerOpen} handleClose={closeCartDrawer}/>
        </ProductsCartProvider>
    )
}

export default App
