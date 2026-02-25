import '@smastrom/react-rating/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {RouterProvider} from "react-router";
import router from "./router.tsx";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    )
}

export default App
