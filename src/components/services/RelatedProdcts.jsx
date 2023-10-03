import axios from "axios";

const RelatedProduct = async () => {
    return await axios.get(`${__BACKEND_URL__}products/relatedProducts`)
    .then(response =>{
        return response.data;
    })
    .catch(err => {
    })
}

export default RelatedProduct