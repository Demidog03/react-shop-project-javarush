import {useQuery} from "@tanstack/react-query";
import productsApi from "../apis/products.api.ts";

export default function useGetProductByIdQuery(id: string | undefined) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => {
            if (id) {
                return productsApi.getProductsById(id.toString())
            }
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: Boolean(id)
    })
}