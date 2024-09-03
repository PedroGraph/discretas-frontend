import axios from "axios";

export const getProducts = async () => {
   return await  axios.get(`${__BACKEND_URL__}api/products/all`,)
   .then((response) => {
      return response.data;
   })
   .catch((error) => {
      console.error(error);
   });
}

export const searchProducts = async name => {
    return await axios.get(`${__BACKEND_URL__}products/search/${name}`)
         .then(response =>{
            return response.data;
         })
         .catch(err => console.error(err));
}

export const filtersProduct = async (filters) => {
   const queryString = Object.entries(filters)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');
    return await axios.get(`${__BACKEND_URL__}api/products/filters?${queryString}`)
         .then(response =>{
            return response.data;
         })
         .catch(err => console.error(err));
}