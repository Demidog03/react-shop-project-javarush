import ProductList from "../../modules/products/ui/ProductsList.tsx";
import MainLayout from "../../layouts/MainLayout.tsx";

function ProductsPage() {
    return (
        <MainLayout>
            <ProductList/>
        </MainLayout>
    );
}

export default ProductsPage;