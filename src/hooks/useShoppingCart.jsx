import { useState, useEffect, useCallback } from "react";
import {
  getShoppingCart,
  updateProductInShoppingCart,
  deleteProductFromShoppingCart,
} from "../services/shoppingCartService";
import { createOrder } from "../services/ordersService";
// import { orderFormat } from "../utils/formats";
import { getUserInfo } from "../services/userService";

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getShoppingCart({ userId: "61439ecb-de5e-45ea-8f3f-661961ffb192" })
      .then((response) => {
        setShoppingCart(response);
      })
      .catch((error) => {
        setError(error);
        console.log("Error getting shopping cart", error);
      })
      .finally(() => {
        setLoading(false);
      });

    getUserInfo("61439ecb-de5e-45ea-8f3f-661961ffb192")
      .then((response) => {
        setUserInfo(response);
      })
      .catch((error) => {
        setError(error);
        console.log("Error getting user info", error);
      });
  }, []);

  const handleSubtotal = useCallback(() => {
    return shoppingCart.reduce((acc, product) => {
      return acc + product.product.productPrice * product.quantity;
    }, 0);
  }, [shoppingCart]);

  const handleDiscount = useCallback(() => {
    return shoppingCart.reduce((acc, product) => {
      return product.discount > 0
        ? acc +
            product.product.productPrice * product.quantity * product.discount
        : acc;
    }, 0);
  }, [shoppingCart]);

  const handleTotal = useCallback(() => {
    return handleSubtotal() - handleDiscount();
  }, [handleSubtotal, handleDiscount]);

  const updateQuantity = useCallback((index, increment) => {
    const updatedProducts = [...shoppingCart];
    updatedProducts[index].quantity = increment
      ? updatedProducts[index].quantity + 1
      : Math.max(updatedProducts[index].quantity - 1, 0);
    updateProductInShoppingCart(
      updatedProducts[index].id,
      updatedProducts[index].quantity
    )
      .then(() => {
        setShoppingCart(updatedProducts);
      })
      .catch((error) => {
        console.log("Error updating product quantity", error);
      });
  }, [shoppingCart]);

  const deleteProductFromShopping = useCallback((index) => {
    const updatedProducts = [...shoppingCart];
    deleteProductFromShoppingCart(updatedProducts[index].id)
      .then(() => {
        updatedProducts.splice(index, 1);
        setShoppingCart(updatedProducts);
      })
      .catch((error) => {
        console.log("Error deleting product", error);
      });
  }, [shoppingCart]);

  const saveForLater = useCallback((index) => {
    const updatedProducts = [...shoppingCart];
    updatedProducts[index].saveForLater = !updatedProducts[index].saveForLater;
    // setShoppingCart(updatedProducts);
  }, [shoppingCart]);

  const createNewOrder = useCallback((data) => {
    // const formattedData = orderFormat(data);
    console.log(data);
    // createOrder(formattedData).then(() => {
    //   console.log("Order created successfully");
    // }).catch((error) => {
    //   console.log("Error creating order", error);
    // });
  }, []);

  const handleUserInfo = useCallback((newUserInfo) => {
    if (JSON.stringify(userInfo) !== JSON.stringify(newUserInfo)) {
      setUserInfo(newUserInfo);
    }
  }, [userInfo]);

  return {
    shoppingCart,
    setShoppingCart,
    loading,
    error,
    handleTotal,
    handleSubtotal,
    handleDiscount,
    updateQuantity,
    deleteProductFromShopping,
    saveForLater,
    createNewOrder,
    userInfo,
    handleUserInfo,
  };
};