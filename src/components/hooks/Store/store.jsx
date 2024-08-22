import { useEffect, useState } from "react";
import useProductContext from "../useProductContext";
import { GetUserInfo } from "../../services/Auth";
import { StoreItems, updateQuantity, deleteProductFromCart}  from "../../services/Store";
import { applyDiscountCode, verifyDiscountCode } from "../../services/Discounts"; 
import { SettingOrder } from "../../services/Orders"; 

export const useStoreHook = () => {

    const [orderItems, setOrderItems] = useState([]);
    const [ordered, setOrdered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [payNow, setPayNow] = useState(false);
    const [discount, setDiscount] = useState({discount: 0, code: ''});
    const [errorCoupon, setErrorCoupon] = useState(null);

    const { userLogged } = useProductContext();

    const isThereProducts = orderItems?.length > 0 && !ordered;

    const handlePayNow = async() => {
      if(!userLogged) return;
      const userInfo = await GetUserInfo(userLogged);
      const dataShopping = {
        userId: userInfo.id,
        products: orderItems.map(product => ({...product, price: product.price * product.quantity})),
        shippingAddress: {
          address: "231 Petye ST",
          city: "New York",
          fullName: "John Doe",
        }
      }
      if(discount.code) {
        const response = await applyDiscountCode({code: discount.code, userId: userInfo.id});
        if(response?.error) await SettingOrder(dataShopping);
        else {
          dataShopping.products = dataShopping.products.map(product => ({...product, price: product.price - (product.price * discount.discount)}));
          await SettingOrder(dataShopping);
        }
      }
      else await SettingOrder(dataShopping);
    }

    useEffect(() => {
        const gettingItems = async () => {
            if(!userLogged) return;
            const userInfo = await GetUserInfo(userLogged);
            const storedItems = await StoreItems(userInfo.id);
            await setOrderItems(storedItems); 
            console.log(orderItems);
            await setLoading(false);
        }
        gettingItems();
       
    }, [userLogged]);

    const handleDiscount = async (e) => {
      e.preventDefault();
      if(!userLogged) return;
      const userInfo = await GetUserInfo(userLogged);
      const formdata = new FormData(e.target)
      const discountCode = formdata.get('coupon');
      const discountAmount = await verifyDiscountCode({code: discountCode, userId: userInfo.id});
      if(discountAmount?.error) return setErrorCoupon(discountAmount?.error);
      setDiscount(discountAmount || {discount: 0, code: ''});
    }

    const handleQuantityChange = async (id, newQuantity) => {
        try{
            setOrderItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item)));
            const userInfo = await GetUserInfo(userLogged);
            await updateQuantity({userId:userInfo.id, productId: id, quantity: newQuantity});
        }catch(error){
            console.log(error);
        }
        
    };
    
    const handleDeleteItem = async (id) => {
      try{
        const userInfo = await GetUserInfo(userLogged);
        await deleteProductFromCart({userId: userInfo.id, productId: id});
        setOrderItems(prevItems =>{
            const newArray = [...prevItems]; 
            newArray.splice(id, 1); 
            return newArray; 
        });
      }catch(error){
        console.log(error);
      }
      
    };

    return { orderItems, setOrderItems, ordered, setOrdered, handleQuantityChange, handleDeleteItem, isThereProducts, loading, payNow, discount, errorCoupon, handleDiscount, handlePayNow };
}