import axios from "axios";

export const RatingInfo = async ({productID, userID}) => {

    const url = `${__BACKEND_URL__}rating/ratingInfo`;

    return await axios.post(url, {
        productID, 
        uid: userID.length === 0 ? null : userID, 
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.error(err);
    })

}

export const ProductRating = async (data) =>{
    const url = `${__BACKEND_URL__}rating/product`;
    return await axios.post(url,data)
    .then((response) =>{
      return response.data;
    })
    .catch((err) =>{
      console.log(err);
    });

}