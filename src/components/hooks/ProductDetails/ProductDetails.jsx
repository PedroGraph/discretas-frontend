import {useEffect, useState} from "react";
import useProductContext from "../useProductContext";
import ProductDetailService from "../../services/ProductDetails";

export const Details = () => {

    const { 
        setProductDetail,
        setModalPayment,
        setProductPurchased,
        handleAddWishList,
    } = useProductContext();
    
    const url = window.location.href;
    const pathSegments = url.split('/');
    const productID = pathSegments[4];
    
    const [quantity, setQuantity] = useState(1);
    const [characteristics, setCharacteristics] = useState({}); 
    const [product, setProduct] = useState({});

    useEffect(() => {
        ProductDetailService(productID).then(response => {
          const { characteristics, ...productSelected } = response;
          productSelected.quantity = 1;
          setProductDetail(response);
          setProduct(response);
          setCharacteristics(response.characteristics)
          setProductPurchased(productSelected);
        });
      }, [productID]); 
  
    const handleQuantityChange = (newQuantity) => {
      if(newQuantity > 0 ) setQuantity(newQuantity);
      setProductPurchased(prevProduct => ({
        ...prevProduct,
        quantity: newQuantity<=0 ? 1 : newQuantity
      }));
    };
  
    const handleShowModal = () => {
      setModalPayment(true);
    };
  
    const handleAddProductToWishList = (event) =>{
      event.preventDefault();
      handleAddWishList(product)
    }

    return {product, quantity, characteristics, handleQuantityChange, handleAddProductToWishList, handleShowModal}
    
}