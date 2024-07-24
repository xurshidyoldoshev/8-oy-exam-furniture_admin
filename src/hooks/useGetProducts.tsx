import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
                if (res.data) {
                    const productsWithKey = res.data.map((product: any) => ({
                        ...product,
                        key: product._id,  
                    }));
                    setProducts(productsWithKey);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    return products;
};

export default useGetProducts;
