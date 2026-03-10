import type {GetProductsResponse} from "./products.api.types.ts";
import type {Product} from "../ui/products.types.ts";
import apiFakeStorePublic from "../../../shared/lib/api/apiFakeStorePublic.ts";

async function getProducts(): Promise<GetProductsResponse> {
    const response = await apiFakeStorePublic.get<GetProductsResponse>("/products")
    return response.data
}

async function getProductsById(id: string): Promise<Product> {
    const response = await apiFakeStorePublic.get<Product>(`/products/${id}`)
    return response.data
}

const productsApi = { getProducts, getProductsById }

export default productsApi;