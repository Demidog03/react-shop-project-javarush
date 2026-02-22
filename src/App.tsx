import '@smastrom/react-rating/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import ProductsCartProvider from "./contexts/products-cart/ProductsCartProvider.tsx";
import {RouterProvider} from "react-router";
import router from "./router.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ProductsCartProvider>
                <RouterProvider router={router} />
            </ProductsCartProvider>
        </QueryClientProvider>
    )
}

export default App
