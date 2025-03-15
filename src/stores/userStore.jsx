import { create } from "zustand";
import { register, loginWithFacebook, loginWithGoogle } from "../api/loginFirebase";
import { firebaseErrors } from "../utils/firebaseErrors";
import { isASocialNetwork } from "../utils/helper";
import {
  getUserInfo,
  getTokenFromGoogle,
  logoutUser, 
  getAddressesByUserId, 
  getWishlistByUserId, 
  getNotificationsByUserId, 
  updateNotifications, 
  updateUserInfo, 
  deleteProductFromWishlist, 
  setProductToWishlist, 
  setAddressToUser, 
  updateAddress,
  deleteAddressFromUser,
  setNewUser,
  login
} from "../services/userService";

const getUserFromLocalStorage = () => {
  return localStorage.getItem("DsessionId") || null;
}

export const useUserStore = create((set) => ({

  user: getUserFromLocalStorage(),
  allUserInfo: null,
  loginError: null,
  isCompleted: false,
  profileSection: "profile",
  profileError: false,
  isLoading: false,
  addresses: [],
  wishlist: [],
  notifications: [],

  setAllUserInfo: (allUserInfo) => set({ allUserInfo }),

  getNotifications: async () => {
    set({ isLoading: true });
    const response = await getNotificationsByUserId(useUserStore.getState().user);
    console.log(response);
    if(response.message) set({ profileError: true });
    // set({ isLoading: false });
    return set({ notifications: response });
  },

  setStatusNotifications: async (id, data) => {
    const response = await updateNotifications(id, data);
    return set({ notifications: response });
  },

  getWishlist: async (allInfo = false) => {
    set({ isLoading: true });
    const response = await getWishlistByUserId(useUserStore.getState().user, allInfo);
    if(response.error) set({ profileError: true });
    // set({ isLoading: false });
    return set({ wishlist: response });
  },

  getAddresses: async () => {
    set({ isLoading: true });
    const response = await getAddressesByUserId(useUserStore.getState().user);
    if(response.error) set({ profileError: true });
    // set({ isLoading: false });
    return set({ addresses: response });
  },

  setAddressToUser: async (addressInfo) => {
   const verifyIfAddressExists = useUserStore.getState().addresses.some(address => address.id === addressInfo.id);
   if (verifyIfAddressExists) {
     await updateAddress(useUserStore.getState().user, addressInfo);
     return set({ addresses: useUserStore.getState().addresses.map(address => {
      if(address.id !== addressInfo.id && addressInfo.default && address.default)  return {...address, default: false};
      else if(address.id == addressInfo.id && addressInfo.default) return {...address, default: true};
      return address;
     })});
   } else {
     await setAddressToUser(useUserStore.getState().user, addressInfo);
     return set({ addresses: [...useUserStore.getState().addresses, addressInfo] });
   }
  },

  deleteAddressFromUser: async (addressId) => {
    set({ addresses: useUserStore.getState().addresses.map(address => address.id === addressId ? { ...address, deleting: true } : address) });
    await deleteAddressFromUser(addressId);
    return set({ addresses: useUserStore.getState().addresses.filter(address => address.id !== addressId) });
  },

  getUserInfo: () => set({ user: getUserFromLocalStorage() }),
  setUser: (userData) => set({ user: userData }),

  logout: async () => {
    await logoutUser()
    set({ user: null })
    localStorage.removeItem("DsessionId");
    window.location.href = "/";
  },

  actionUser: async (data, event) => {
    try {
      if(event) event.preventDefault();
      set({ loginError: null, isLoading: true });
      const pressedButton = event?.nativeEvent?.submitter?.value || "register";
      const actions = {
        login: login,
        register: register,
        facebook: loginWithFacebook,
        google: loginWithGoogle,
      };

      if (actions[pressedButton]) {
        if (isASocialNetwork(pressedButton)) {
          const user = await actions[pressedButton](data);
          const userExists = await useUserStore.getState().verifIfUserExists(user.email);
          if (userExists) {
            const response = await getTokenFromGoogle(user);
            if (response.success) set({ user: response.user.id });
            localStorage.setItem("DsessionId", response.user.id);
            window.history.back();
          }else{
            const { idToken, ...infoUser } = user;
            await setNewUser(infoUser);
            const response = await getTokenFromGoogle(user);
            if (response.success) set({ user: response.user.id });
            localStorage.setItem("DsessionId", response.user.id);
            window.history.back();
          }
        } else {
          if(pressedButton === "login"){
            const email = new FormData(event.target).get("email");
            const password = new FormData(event.target).get("password");
            const user = await login({email, password});
            if(user.success) set({ user: user.user.id });
            localStorage.setItem("DsessionId", user.user.id);
            window.history.back(); 
          }else{
            const userInfo ={
              firstName: data.name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              password: data.password,
            };
            const response = await setNewUser(userInfo);
            if(response.success) set({ user: response.user.id });
            localStorage.setItem("DsessionId", response.user.id);
            window.location.href = "/";
          }
        }
        set({ isCompleted: true });
      }
    } catch (error) {
      console.error(error);
      set({ loginError: { [event?.nativeEvent?.submitter?.value]: firebaseErrors[error.code] } });
    } finally {
      set({ isLoading: false, isCompleted: false });
    }
  },

  getAllUserInfo: async () => {
    set({ isLoading: true });
    const response = await getUserInfo(useUserStore.getState().user);
    if(response.message) set({ profileError: true });
    set({ isLoading: false });
    return set({ allUserInfo: response });
  },

  verifIfUserExists: async (email) => {
    const response = await getUserInfo(email);
    return !response.message;
  },

  updateUserInformation: async (data) => {
    const response = await updateUserInfo(useUserStore.getState().user, data);
    return set({ allUserInfo: response });
  },

  setProfileSection: (section) => set({ profileSection: section }),

  setWishlist: async (wishlist) => {
    let ifExists = false;
    const currentWishlist = useUserStore.getState().wishlist || [];

    if (currentWishlist.length > 0 && currentWishlist[0]?.products) {
      ifExists = currentWishlist.some(product => product.products.id === wishlist.id);
    } else {
      ifExists = currentWishlist.some(product => product.productId === wishlist.id);
    }

    if (ifExists) {
      const newWishlist = currentWishlist.filter(item => item.products ? item.products.id !== wishlist.id : item.productId !== wishlist.id)

      await deleteProductFromWishlist(useUserStore.getState().user, wishlist.id);
      return set({ wishlist: newWishlist });
    } else {
      await setProductToWishlist(useUserStore.getState().user, { productId: wishlist.id });

      const updatedWishlist = [...currentWishlist, { productId: wishlist.id }];
      return set({ wishlist: updatedWishlist });
    }
  },

}));
