import MainLayout from "../../layouts/MainLayout.tsx";
import {useParams} from "react-router";
import {useEffect} from "react";
import type {Product} from "../../components/products/products.types.ts";

function ProductDetailsPage() {
    const { id } = useParams()

    async function fetchProduct(id: string) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const data = await response.json() as Product
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id) {
            void fetchProduct(id)
        }
    }, [id])

    return (
        <MainLayout>
            <h1>Product Details</h1>
        </MainLayout>
    );
}

export default ProductDetailsPage;