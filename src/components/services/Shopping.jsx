import axios from "axios";

export const addProductToCart = async (data) => {
    return await axios.post(`${__BACKEND_URL__}api/shopping/create`, data)
        .then(response =>{
        return response.data;
        })
        .catch(err => console.error(err));
}

