import { Button, Modal } from "antd"
import { useState } from "react";
import ProductForm from "./ProductForm";
import { editProduct, getProductById } from "../api";

type ProductFormProps = {
    title: string,
    subtitle: string,
    description: string,
    size: string,
    rate: string,
    price: string,
    color: string,
    image: string,
    _id?: string,
    __v?: string
}

function EditProduct({ productId }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleProduct, setSingleProduct] = useState<any>(null);

    const showModal = async () => {
        setIsModalOpen(true);
        const product = await getProductById(productId)
        setSingleProduct(product?.data);
    };

    const handleEdit = async (productForm: ProductFormProps) => {
        const { _id, __v, ...product } = productForm
        const res = await editProduct(product, productId)
        if (res!) {
            alert("Product edited successfully")
        }
        handleCancel()
        window.location.reload();
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Button onClick={showModal} type="primary">Edit</Button>
            <Modal title="Edit Product" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <ProductForm onSubmit={handleEdit} initialValues={singleProduct} />
            </Modal>
        </div>
    )
}

export default EditProduct