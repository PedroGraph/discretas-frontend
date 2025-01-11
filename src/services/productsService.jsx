import axios from "axios"
export const getProducts = () => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/products/all`)
        .then((response) => {
            const products = response.data.map((product) => {
                //eslint-disable-next-line
                const { quantity, ... rest } = product;
                return rest;
            });
            resolve(products);
        })
        .catch((error) => {
            reject(error);
        });
    });
    
}

export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/products/${id}`)
        .then((response) => {
            //eslint-disable-next-line
            const { quantity, ... rest } = response.data;
            resolve(rest);
        })
        .catch((error) => {
            reject(error);
        });
    });
    
}