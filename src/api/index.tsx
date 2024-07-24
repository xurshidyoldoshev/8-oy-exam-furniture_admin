import axios from "axios";

export async function createProduct(data: any) {
    try {
        const res = await axios.post(`https://ecommerce-backend-fawn-eight.vercel.app/api/products`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": window.localStorage.getItem("token")
                },
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(productId: any) {
    try {
        const res = await axios.get(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${productId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function editProduct(data: any, productId: number) {
    try {
        const res = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${productId}`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": window.localStorage.getItem("token")
                },
            }
        );
        if (res) {
            alert("success");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(productId: number) {
    try {
        const res = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${productId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": window.localStorage.getItem("token")
                },
            }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function loginUser(user: any) {
    try {
        const res = await axios.post(`https://ecommerce-backend-fawn-eight.vercel.app/api/auth`, user,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": window.localStorage.getItem("token")
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
