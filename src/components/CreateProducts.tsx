import { useState } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

const CreateProducts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCreate = async (values: any) => {
        console.log(values);

        try {
            const token = window.localStorage.getItem('token');

            await axios.post(
                'https://ecommerce-backend-fawn-eight.vercel.app/api/products',
                values,
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setIsModalOpen(false);
            form.resetFields();
            notification.success({
                message: 'Product Created',
                description: 'The product has been successfully created.',
            });
            window.location.reload()
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Product Creation Failed',
                description: 'There was an error creating the product. Please try again.',
            });
        }
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>Create Product</Button>
            <Modal
                title="Create Product"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleCreate}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="subtitle"
                        label="Subtitle"
                        rules={[{ required: true, message: 'Please input the subtitle!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="size"
                        label="Size"
                        rules={[{ required: true, message: 'Please input the size!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="rate"
                        label="Rate"
                        rules={[{ required: true, message: 'Please input the rate!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="color"
                        label="Color"
                        rules={[{ required: true, message: 'Please input the color!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image URL"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreateProducts;
