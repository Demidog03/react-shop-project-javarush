import '@smastrom/react-rating/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ProductsCartProvider from "./contexts/products-cart/ProductsCartProvider.tsx";
import {RouterProvider} from "react-router";
import router from "./router.tsx";

function App() {
    return (
        <ProductsCartProvider>
            <RouterProvider router={router} />
        </ProductsCartProvider>
    )
}

export default App
