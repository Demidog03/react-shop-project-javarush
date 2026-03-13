import {useQuery} from "@tanstack/react-query";
import productsApi from "../apis/products.api.ts";

export default function useGetProductsCountQuery() {
    return useQuery({
        queryKey: ['products', 'count'],
        queryFn: productsApi.getProductsCount,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: true,
        refetchInterval: 300000
    })
}