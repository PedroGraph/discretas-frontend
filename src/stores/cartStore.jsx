import { create } from "zustand";
import {
  getShoppingCart,
  updateShoppingCartItem,
  removeFromShoppingCart,
} from "../services/shoppingCartService";
import { useUserStore } from "./userStore";
import { getUserInfo } from "../services/userService";

export const useShoppingCartStore = create((set, get) => ({

  shoppingCart: [],
  userInfo: null,
  loading: false,
  error: null,
  sections: {
    cartInfo: true,
    deliveryInfo: false,
    paymentInfo: false,
  },

  fetchShoppingCart: async () => {
    set({ loading: true, error: null });

    const userId = useUserStore.getState().user; 
    if (!userId) {
      set({ loading: false });
      console.error("No userId found");
      return;
    }

    try {
      const cart = await getShoppingCart({ userId });
      const userInfo = await getUserInfo(userId);
      set({ shoppingCart: cart, userInfo, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
      console.error("Error fetching shopping cart or user info", err);
    }
  },


  handleSubtotal: () => {
    return get().shoppingCart.reduce((acc, product) => acc + product.product.productPrice * product.quantity, 0);
  },

  handleDiscount: () => {
    return get().shoppingCart.reduce((acc, product) => {
      return product.discount > 0
        ? acc + product.product.productPrice * product.quantity * product.discount
        : acc;
    }, 0);
  },

  handleTotal: () => {
    return get().handleSubtotal() - get().handleDiscount();
  },


  updateQuantity: async (index, increment) => {
    const updatedProducts = [...get().shoppingCart];
    updatedProducts[index].quantity = increment
      ? updatedProducts[index].quantity + 1
      : Math.max(updatedProducts[index].quantity - 1, 0);
    try {
      await updateShoppingCartItem(updatedProducts[index].id, updatedProducts[index].quantity);
      set({ shoppingCart: updatedProducts });
    } catch (err) {
      console.error("Error updating product quantity", err);
    }
  },

  deleteProductFromShopping: async (index) => {
    const updatedProducts = [...get().shoppingCart].map((product, i) => {
      if (i === index) {
        product.deleting = true;
      }
      return product;
    });

    try {
      await removeFromShoppingCart(updatedProducts[index].id);
      updatedProducts.splice(index, 1);
      set({ shoppingCart: updatedProducts });
    } catch (err) {
      console.error("Error deleting product", err);
    }
  },

  saveForLater: (index) => {
    const updatedProducts = [...get().shoppingCart];
    updatedProducts[index].saveForLater = !updatedProducts[index].saveForLater;
    set({ shoppingCart: updatedProducts });
  },

  createNewOrder: async (data) => {
    try {
      console.log(data);
      // const formattedData = orderFormat(data);
      // await createOrder(formattedData);
      console.log("Order created successfully");
    } catch (err) {
      console.error("Error creating order", err);
    }
  },

  updateSections: ({ cartInfo = true, deliveryInfo = false, paymentInfo = false }) => {
    set({ sections: { cartInfo, deliveryInfo, paymentInfo } });
  },

  handleUserInfo: (newUserInfo) => {
    if (JSON.stringify(get().userInfo) !== JSON.stringify(newUserInfo)) {
      set({ userInfo: newUserInfo });
    }
  },

}));
