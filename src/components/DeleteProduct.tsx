import { Button } from "antd"
import { deleteProduct } from "../api"

const DeleteProduct = ({ productId }: any) => {
    const handleDelete = async () => {
        const isAgree = confirm('Are you sure you want to delete this product')
        if (isAgree) {
            const res = await deleteProduct(productId)
            if (res) {
                alert('Product deleted successfully')
            }
            window.location.reload()
        }
    }
    return (
        <div>
            <Button onClick={handleDelete} type="primary">Delete</Button>
        </div>
    )
}

export default DeleteProduct