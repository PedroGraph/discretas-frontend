import axios from "axios";

export const searchProducts = async name => {

    return await axios.get(`${__BACKEND_URL__}products/search/${name}`)
         .then(response =>{
            return response.data;
         })
         .catch(err => console.error(err));

}