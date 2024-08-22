import axios from "axios";

export const StoreItems = async (userId) => {
    try {
        let storeItems = await axios.get(`${__BACKEND_URL__}api/shopping/all/${userId}`);
        if(storeItems.data?.length === 0) return [];
        const items = await Promise.all(
            storeItems.data.products.map(async (item) => {
                const product = await axios.get(`${__BACKEND_URL__}api/products/${item.productID}`);
                const {color, price, size, quantity, id, ...productDetails} = product.data
                return {  id: item.productID, ...item, ...productDetails };
            })
        );
        return items;
    } catch (error) {
        console.error(error);
    }
};

export const updateQuantity = async ({ userId, productId, quantity}) => {
    return await axios.put(`${__BACKEND_URL__}api/shopping/update/${userId}`, { productId, quantity})
        .then(response =>{
        return response.data;
        })
        .catch(err => console.error(err));
}

export const deleteProductFromCart = async ({userId, productId}) => {
    console.log(userId, productId)
    return await axios.delete(`${__BACKEND_URL__}api/shopping/delete/${userId}?productId=${productId}`)
        .then(response =>{
        return response.data;
        })
        .catch(err => console.error(err));
}

