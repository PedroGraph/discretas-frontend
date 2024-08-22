import axios from "axios";

const ProductDetail = async (productId) => {

    return await axios.get(`${__BACKEND_URL__}api/products/${productId}`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.error(error);
    })
 
}

export default ProductDetail;