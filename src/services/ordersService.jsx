import axios from "axios";

export const createOrder = (order) => {
    if(!order) return;
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/api/orders/create`, order)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

export const getOrders = ({userId, date, status}) => {
    if(!userId || !date) return;
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/orders/all/${userId}?date=${date}${status ? `?status=${status}` : ""}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            if(error.status === 404) return setTimeout(() => resolve({error: "not found"}), 4000);
            reject(error);
        })
    })
}