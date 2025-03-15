import axios from "axios";

export const setNewUser = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/signup`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
       axios.post(`${__BACKEND_URL__}/api/users/login`, { email, password })
       .then((response) => {
          resolve(response.data);
       })
       .catch((error) => {
          reject(error);
       });
    });
}

export const logoutUser = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/logout`, {}, {withCredentials: true})
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const recoveryPassword = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/reset-password`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const verifyCode = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/verify-code`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const setPassword = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/change-password`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}
       

export const getUserInfo = (field) =>{
    return new Promise((resolve, reject) => {
        axios.get(`${__BACKEND_URL__}/api/users/getuser/${field}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve({message: error.message});
        });
    });
}


export const getTokenFromGoogle = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/users/googleLogin/`, data, {withCredentials: true})
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
        axios.put(`${__BACKEND_URL__}/api/users/updateuser/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const getAddressesByUserId = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${__BACKEND_URL__}/api/addresses/users/${id}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve({error: error.message});
        })
    });
}

export const updateAddress = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${__BACKEND_URL__}/api/addresses/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const deleteAddressFromUser = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${__BACKEND_URL__}/api/addresses/${id}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const setAddressToUser = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/addresses/users/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const setProductToWishlist = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${__BACKEND_URL__}/api/wishlists/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const getWishlistByUserId = (id, allinfo) => {
    return new Promise((resolve, reject) => {
        axios.get(`${__BACKEND_URL__}/api/wishlists/${id}?${!allinfo && "allinfo=true"}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error)
            resolve({error: error.message});
        })
    });
}

export const deleteProductFromWishlist = (userId, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${__BACKEND_URL__}/api/wishlists/${id}?userId=${userId}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}

export const getNotificationsByUserId = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${__BACKEND_URL__}/api/users/notifications/${id}`)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            resolve({error: error.message});
        })
    });
}

export const updateNotifications = (id, data) => {
    return new Promise((resolve, reject) => {
        axios.put(`${__BACKEND_URL__}/api/users/notifications/${id}`, data)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        })
    });
}