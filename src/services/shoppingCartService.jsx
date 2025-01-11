import axios from "axios"
export const getShoppingCart = ({userId}) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/shopping/all/${userId}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const addProductToShoppingCart = (shoppingCartData) => {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/api/shopping/create/`, {
            shoppingCartData
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const updateProductInShoppingCart = (shoppingId, quantity) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/shopping/update/${shoppingId}`, {
            quantity
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const deleteProductFromShoppingCart = (shoppingId) => { 
    console.log("deleteProductFromShoppingCart", shoppingId);
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/api/shopping/delete/${shoppingId}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}