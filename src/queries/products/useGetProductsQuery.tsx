import {useQuery} from "@tanstack/react-query";
import productsApi from "../../apis/products/products.api.ts";

export default function useGetProductsQuery() {
    return useQuery({
        queryKey: ['products'],
        queryFn: productsApi.getProducts,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: true,
        refetchInterval: 300000
    })
}