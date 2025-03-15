import { create } from "zustand";
import { extractProductId } from "../utils/formats";
import { getProductDetails } from "../services/productsService";
import { addToShoppingCart } from "../services/shoppingCartService"; 
import { shoppingCartFormat } from "../utils/formats";
import { useUserStore } from "./userStore";

export const useProductDetailsStore = create((set, get) => ({
  productDetails: null,
  loading: false,
  loadingButton: false,
  errorButton: false,
  error: null,
  selectedCharacteristic: { color: "", size: "", quantity: 1 }, 
  modal: false,
  isDone: false,

  setModal: (value) => set({ modal: value }),

  fetchProductDetails: async (pathname, navigationState) => {
    set({ loading: true, error: null });
    try {
      let product = navigationState || await getProductDetails(extractProductId(pathname));
      set({ productDetails: product, quantity: 1 });
      if (product.characteristics?.length > 0) {
        set({
          selectedCharacteristic: {
            color: product.characteristics[0]?.color || "",
            size: product.characteristics[0]?.size || "",
            quantity: 1,
          },
        });
      }
      set({ loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  handleAddProductToCart: async () => {
    set({ loadingButton: true, errorButton: null });
    try {
      const userId = useUserStore.getState().user;
      const { productDetails, selectedCharacteristic } = get();
      const shoppingCartData = shoppingCartFormat({
        userId,
        ...selectedCharacteristic,
        ...productDetails,
      });
      const response = await addToShoppingCart(shoppingCartData);
      if(response.status === 400) set({ errorButton: response.message });
      else set({ isDone: true });
      setTimeout(() => {
        set({ isDone: false, errorButton: null });
      }, 2000);
    } catch (error) {
      console.log(error)
      set({ errorButton: error });
    } finally {
      set({ loadingButton: false });
    }
  },

  handleCharacteristics: ({ color, size, quantity }) => {
    const { selectedCharacteristic } = get();
    set({
      selectedCharacteristic: {
        color: color || selectedCharacteristic.color,
        size: size || selectedCharacteristic.size,
        quantity: quantity !== undefined ? quantity : selectedCharacteristic.quantity,
      },
    });
  },
  
}));
