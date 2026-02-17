import {createBrowserRouter} from "react-router";
import ProductsPage from "./pages/products/ProductsPage.tsx";
import ProductDetailsPage from "./pages/product-details/ProductDetailsPage.tsx";
import SignInPage from "./pages/sign-in/SignInPage.tsx";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductsPage/>
    },
    {
        path: '/product-details/:id',
        element: <ProductDetailsPage/>
    },
    {
        path: '/sign-in',
        element: <SignInPage/>
    },
    {
        path: '/sign-up',
        element: <SignUpPage/>
    }
])

export default router