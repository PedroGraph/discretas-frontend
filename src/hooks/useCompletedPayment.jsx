import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productsService";

export const useCompletedPayment = () => {
    const location = useLocation();
    const [order, setOrder] = useState(null);
    const [infoProducts, setInfoProducts] = useState({});
    
    useEffect(() => {
        let navigationState = location.state?.order;
        console.log(location.state)
        const productsId = navigationState?.products?.map((product) => product.productId);
        getProducts(productsId).then((products) => {
            setOrder({...navigationState, products, payment: location.state.payment});
            setInfoProducts({
                images: products.map((product) => { return {imageName: product.images[0].imageName} }),
                text: products.map((product) => product.name)
            })
        }).catch((error) => {
            console.error(error);
        });
    }, [location.state]);

    return { order, infoProducts };
}