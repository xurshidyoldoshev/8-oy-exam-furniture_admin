import CreateProducts from "../../components/CreateProducts";
import ProductsTable from "../../components/ProductsTable";
import useGetProducts from "../../hooks/useGetProducts";

const ProductPage = () => {
    const products = useGetProducts();

    return (
        <div>
            <CreateProducts />
            <ProductsTable products={products} />
        </div>
    )
}

export default ProductPage;
