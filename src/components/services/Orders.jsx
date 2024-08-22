import axios from "axios";

export const GettingOrders = async (userId) => {
    return await axios.get(`${__BACKEND_URL__}api/orders/all/${userId}`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.error(error);
    })
 
}

export const SettingOrder = async (data) => {
    return await axios.post(`${__BACKEND_URL__}api/orders/create`, data)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.error(error);
    })
}
