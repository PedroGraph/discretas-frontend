import {useEffect, useState} from "react";
import useProductContext from "../useProductContext";
import ProductDetailService from "../../services/ProductDetails";
import { GetUserInfo } from "../../services/Auth";
import {addProductToCart} from "../../services/Shopping";
export const Details = () => {

    const { 
        setProductDetail,
        setModalPayment,
        setProductPurchased,
        handleAddWishList,
        userLogged,
        setOrderList
    } = useProductContext();
    
    const url = window.location.href;
    const pathSegments = url.split('/');
    const productID = pathSegments[4];
    
    const [quantity, setQuantity] = useState(1);
    const [characteristics, setCharacteristics] = useState({}); 
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantityToAdd, setQuantityToAdd] = useState(1);
    const [error, setError] = useState(null);
    const [enabledSection, setEnableSection] = useState("Description");

    useEffect(() => {
        ProductDetailService(productID).then(response => {
          const { characteristics, ...productSelected } = response;
          productSelected.quantity = 1;
          setProductDetail(response);
          setProduct(response);
          setCharacteristics(response.characteristics)
          setProductPurchased(response);
        });
      }, [productID]); 
  
    const handleQuantityChange = (newQuantity) => {
      if(newQuantity > 0 ) setQuantity(newQuantity);
      setProductPurchased(prevProduct => ({
        ...prevProduct,
        quantity: newQuantity<=0 ? 1 : newQuantity
      }));

    };
    
  useEffect(() => {
    if (product?.characteristics){
      setSelectedColor(product?.characteristics[0]?.color);
      setSelectedSize(product?.characteristics[0]?.size[0]);
    }
  }, [product]);
    
  useEffect(() => {
    handleQuantityChange(quantityToAdd);
  }, [quantityToAdd]);
  
    const handleShowModal = () => {
      setModalPayment(true);
    };
  
    const handleAddProductToWishList = (event) =>{
      event.preventDefault();
      handleAddWishList(product)
    }

    const handleAddToCart = async() => {
      try{
        setIsLoading(true);
        const userInfo = await GetUserInfo(userLogged);
        const userId = userInfo.id;
        const order = {
          userId,
          products: [{
            productID: product.id,
            price: product.price,
            quantity: quantityToAdd,
            color: selectedColor,
            size: selectedSize
            }]
        }
        setOrderList(prev => [...prev, order]);
        const response = await addProductToCart(order);
        if(!response.info) console.error(response);
        setIsLoading(false);
        setIsComplete(true);
        setTimeout(() => {
          setIsComplete(false);
        }, 2000)
      }catch(error){
        console.error(error);
      }finally{
        setIsLoading(false);
      }    
    }

    return {
      product, 
      quantity, 
      characteristics, 
      selectedColor, 
      setSelectedColor, 
      selectedSize, 
      setSelectedSize, 
      quantityToAdd, 
      setQuantityToAdd, 
      error, 
      setError,
      setIsComplete, 
      setIsLoading, 
      isComplete, 
      isLoading, 
      handleQuantityChange, 
      handleAddProductToWishList, 
      handleShowModal, 
      handleAddToCart,
      enabledSection,
      setEnableSection
    }
    
}