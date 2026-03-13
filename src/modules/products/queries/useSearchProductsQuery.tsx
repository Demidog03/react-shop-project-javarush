import {useQuery} from "@tanstack/react-query";
import productsApi from "../apis/products.api.ts";

export default function useSearchProductsQuery(search: string, offset: number = 0, limit: number = 15) {
    return useQuery({
        queryKey: ['products', 'search', search, offset, limit],
        queryFn: () => productsApi.searchProducts(search, offset, limit),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchIntervalInBackground: true,
        refetchInterval: 300000
    })
}