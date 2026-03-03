import {createBrowserRouter} from "react-router";
import ProductDetailsPage from "./pages/product-details/ProductDetailsPage.tsx";
import SignInPage from "./pages/sign-in/SignInPage.tsx";
import SignUpPage from "./pages/sign-up/SignUpPage.tsx";
import {ProductsPageLazy} from "./lazyRoutes.ts";
import AuthPageGuard from "./modules/auth/guards/AuthPageGuard.tsx";
import PublicPageGuard from "./modules/auth/guards/PublicPageGuard.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthPageGuard>
                <ProductsPageLazy/>
            </AuthPageGuard>
        )
    },
    {
        path: '/product-details/:id',
        element: (
            <AuthPageGuard>
                <ProductDetailsPage/>
            </AuthPageGuard>
        )
    },
    {
        path: '/sign-in',
        element: (
            <PublicPageGuard>
                <SignInPage/>
            </PublicPageGuard>
        )
    },
    {
        path: '/sign-up',
        element: (
            <PublicPageGuard>
                <SignUpPage/>
            </PublicPageGuard>
        )
    }
])

export default router