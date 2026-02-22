import {useQueries} from "@tanstack/react-query";
import productsApi from "../../apis/products/products.api.ts";

export default function useGetProductsByIdsQuery(ids: string[], open: boolean) {
    return useQueries({
        queries: ids.map((id) => {
            return {
                queryKey: ['products', id],
                queryFn: () => productsApi.getProductsById(id.toString()),
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                enabled: open
            }
        }),
    })
}