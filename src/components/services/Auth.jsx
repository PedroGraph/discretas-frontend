import axios from "axios";

const UpdateUserInfo = async (userInfo) => {
    const fullName = userInfo.displayName ? userInfo.displayName.split(" ") : '';
    const fields = {
        email: userInfo.email,
        name: fullName[0] || userInfo.name,
        last_name: fullName[1] || userInfo.last_name,
        uid: userInfo.uid,
        photourl: userInfo.photoURL,
        address: userInfo.address || '',
        city: userInfo.city || '',
        state: userInfo.state || '',
        phone: userInfo.phone || '',
        idcard: userInfo.idcard || ''
    }
    return await axios.put(`${__BACKEND_URL__}users/updateUser`,fields)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        return error.response.data;
    })
 
}

export default UpdateUserInfo;