import axios from "axios";

export const UpdateUserInfo = async (userInfo, uid) => {
    const fullName = userInfo.displayName ? userInfo.displayName.split(" ") : '';
    const fields = {
        email: userInfo.email,
        name: fullName[0] || userInfo.name,
        last_name: fullName[1] || userInfo.last_name,
        photourl: userInfo.photoURL,
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        phone: userInfo.phone || '',
        idcard: userInfo.idcard || ''
    }
    return await axios.put(`${__BACKEND_URL__}api/users/updateuser/${uid}`,fields)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        return error.response.data;
    })
 
}

export const GetUserInfo = async (emailOrId) => {
    return await axios.get(`${__BACKEND_URL__}api/users/getuser/${emailOrId}`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        return error.response.data;
    })
}

export const RegisterUser = async (data) => {
    return await axios.post(`${__BACKEND_URL__}api/users/signup`, data)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        return error.response.data;
    })
}