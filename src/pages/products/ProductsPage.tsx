import ProductList from "../../components/products/ProductsList.tsx";
import MainLayout from "../../layouts/MainLayout.tsx";

function ProductsPage() {
    return (
        <MainLayout>
            <ProductList/>
        </MainLayout>
    );
}

export default ProductsPage;