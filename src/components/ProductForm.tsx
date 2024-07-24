import { Button, Flex, Input } from "antd"
import { useEffect, useState } from "react"

const initialState = {
    title: "",
    subtitle: "",
    description: "",
    size: "",
    rate: "",
    price: "",
    color: "",
    image: ""
}

type ProductFormProps = {
    onSubmit: (productForm: {
        title: string,
        subtitle: string,
        description: string,
        size: string,
        rate: string,
        price: string,
        color: string,
        image: string
    }) => void;
    initialValues?: {
        title: string,
        subtitle: string,
        description: string,
        size: string,
        rate: string,
        price: string,
        color: string,
        image: string
    };
}

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
    const [productForm, setProductForm] = useState(initialState)
    const handleChange = (e: any) => {
        const { name, value } = e.target
        setProductForm(prevForm => ({ ...prevForm, [name]: value }))
    }

    const handleSubmit = () => {
        onSubmit(productForm)
    }

    useEffect(() => {
        if (initialValues) {
            setProductForm(initialValues)
        }
        return () => {
            setProductForm(initialState)
        }
    }, [initialValues])
    return (
        <div>
            <form>
                <Flex vertical gap="middle">
                    <div>
                        <Input placeholder="Title" name="title" value={productForm.title} onChange={handleChange} />
                    </div>
                    <div>
                        <Input placeholder="Subtitle" name="subtitle" value={productForm.subtitle} onChange={handleChange} />
                    </div>
                    <div>
                        <Input placeholder="Description" name="description" value={productForm.description} onChange={handleChange} />
                    </div>
                    <div>
                        <Input placeholder="Size" name="size" value={productForm.size} onChange={handleChange} type="number" />
                    </div>
                    <div>
                        <Input placeholder="Rate" name="rate" value={productForm.rate} onChange={handleChange} type="number" />
                    </div>
                    <div>
                        <Input placeholder="Price" name="price" value={productForm.price} onChange={handleChange} />
                    </div>
                    <div>
                        <Input placeholder="Color" name="color" value={productForm.color} onChange={handleChange} />
                    </div>
                    <div>
                        <Input placeholder="Image" name="image" value={productForm.image} onChange={handleChange} />
                    </div>
                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                </Flex>
            </form>
        </div>
    )
}

export default ProductForm