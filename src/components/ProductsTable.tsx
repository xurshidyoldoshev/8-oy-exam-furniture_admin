import { Table, type TableColumnsType } from 'antd';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

interface DataType {
    key: React.Key;
    title: string;
    subtitle: string;
    price: number;
    image: string;
}

const columns: TableColumnsType<DataType> = [
    // {
    //     title: "Image",
    //     dataIndex: 'image',
    //     render: (imgUrl) => <img alt={imgUrl} width={100} src={imgUrl} />
    // },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Subtitle',
        dataIndex: 'subtitle',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        render: (_, record) => {
            return <EditProduct productId={record.key} />
        }
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_, record) => {
            return <DeleteProduct productId={record.key} />
        }
    }
];

function ProductsTable({ products }: { products: DataType[] }) {
    return (
        <div>
            <Table columns={columns} dataSource={products} size="middle" />
        </div>
    );
}

export default ProductsTable;
