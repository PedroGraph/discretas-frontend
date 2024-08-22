import axios from "axios";

export const verifyDiscountCode = async ({code, userId}) => {
    console.log(code, userId)
    return await axios.get(`${__BACKEND_URL__}api/discounts/verifyCode/${code}?userId=${userId}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.error(err));
}

export const applyDiscountCode = async ({code, userId}) => {
    console.log(code, userId)
    return await axios.post(`${__BACKEND_URL__}api/discounts/new`, { code, userId })
    .then(response => {
        return response.data;
    })
    .catch(err => console.error(err));
}