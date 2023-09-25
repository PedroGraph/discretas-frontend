import axios from "axios";

export const ProductComments = async (productId) => {

    return await axios.get(`${__BACKEND_URL__}comments/${productId}`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.error(error);
    })
 
}

export const SaveComment = async (data) => {

    return await axios.post(`${__BACKEND_URL__}comments/addComment`, data)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.error(error);
    })
 
}

