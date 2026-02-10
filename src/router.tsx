import {createBrowserRouter} from "react-router";
import ProductsPage from "./pages/products/ProductsPage.tsx";
import ProductDetailsPage from "./pages/product-details/ProductDetailsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductsPage/>
    },
    {
        path: '/product-details/:id',
        element: <ProductDetailsPage/>
    }
])

export default router