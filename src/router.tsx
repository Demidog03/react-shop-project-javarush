import {createBrowserRouter} from "react-router";
import ProductDetailsPage from "./pages/product-details/ProductDetailsPage.tsx";
import SignInPage from "./pages/sign-in/SignInPage.tsx";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import {ProductsPageLazy} from "./lazyRoutes.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductsPageLazy/>
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