import React, { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Flex, Form, Input, InputNumber, Modal, Table, Typography } from 'antd';
import axios from 'axios';

interface Item {
    key: string | undefined;
    name: string | undefined;
    image: string | undefined;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const CategoryPage: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<Item>();
    const [checkedAxiosPostCreate, setCheckedAxiosPostCreate] = useState<any>(null)

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get("https://ecommerce-backend-fawn-eight.vercel.app/api/categories")
                const dataWithKey = res.data.map((item: any, index: number) => ({
                    ...item,
                    key: item._id || index.toString(),
                }));
                setData(dataWithKey);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])

    const handleDelete = async (id: string | undefined) => {
        try {
            const res = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': window.localStorage.getItem("token")
                    }
                }
            );
            window.location.reload()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (category: Item) => {
        setCheckedAxiosPostCreate("PUT")
        setSelectedCategory({ ...category });
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        try {
            if (checkedAxiosPostCreate === "PUT") {
                const res = await axios.put(
                    `https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectedCategory?.key}`,
                    {
                        name: selectedCategory?.name,
                        image: selectedCategory?.image,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem("token"),
                        },
                    }
                );
                console.log(res);
                window.location.reload();
            } else if (checkedAxiosPostCreate === "POST") {
                const res = await axios.post(
                    `https://ecommerce-backend-fawn-eight.vercel.app/api/categories`,
                    {
                        name: selectedCategory?.name,
                        image: selectedCategory?.image,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem("token"),
                        },
                    }
                );
                console.log(res);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleCreateCategory = async () => {
        setIsModalOpen(true);
        setCheckedAxiosPostCreate("POST");
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCategoryChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        console.log(name, value);

        setSelectedCategory((categoryPreviousValue): any => ({
            ...categoryPreviousValue, [name]: value,
        }))
    }

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: '25%',
            editable: false,
            render: (imgUrl: string | undefined) => (
                <img src={imgUrl} alt="Category" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            )
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Edit',
            dataIndex: 'editOperation',
            render: (_: any, record: any) => {
                return (
                    <Typography.Link onClick={() => showModal(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'Delete',
            dataIndex: 'deleteOperation',
            render: (_: any, record: Item) => {
                return (
                    <Typography.Link onClick={() => handleDelete(record.key)}>
                        Delete
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns: TableProps['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Button onClick={handleCreateCategory}>Create</Button>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <form>
                    <Flex gap="middle" vertical>
                        <label>
                            <Input name='name' placeholder="Name" value={selectedCategory?.name} onChange={handleCategoryChange} />
                        </label>
                        <label>
                            <Input name='image' placeholder="Image URL" value={selectedCategory?.image} onChange={handleCategoryChange} />
                        </label>
                    </Flex>
                </form>
            </Modal>
        </Form>
    );
};

export default CategoryPage;