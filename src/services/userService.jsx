import axios from "axios"
export const getUserInfo = (id) =>{
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/api/users/getuser/${id}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const updateUserInfo = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/api/users/updateuser/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}