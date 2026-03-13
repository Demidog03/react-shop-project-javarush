import type {GetProductsResponse} from "./products.api.types.ts";
import type {Product} from "../ui/products.types.ts";
import apiPlatziFakeStorePublic from "../../../shared/lib/api/apiPlatziFakeStorePublic.ts";

async function getProductsCount(): Promise<number> {
    const response = await apiPlatziFakeStorePublic.get<GetProductsResponse>("/products")
    return response.data.length || 0
}

async function getProducts(): Promise<GetProductsResponse> {
    const response = await apiPlatziFakeStorePublic.get<GetProductsResponse>("/products?offset=0&limit=15")
    return response.data
}

async function searchProducts(search: string, offset: number = 0, limit: number = 15): Promise<GetProductsResponse> {
    const response = await apiPlatziFakeStorePublic.get<GetProductsResponse>("/products", {
        params: {
            offset,
            limit,
            title: search
        }
    })
    return response.data
}


async function getProductsById(id: string): Promise<Product> {
    const response = await apiPlatziFakeStorePublic.get<Product>(`/products/${id}`)
    return response.data
}

const productsApi = { getProducts, getProductsById, searchProducts, getProductsCount }

export default productsApi;