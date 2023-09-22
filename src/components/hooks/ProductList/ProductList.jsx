import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "../useProductContext";

export const ProductListTools = () => {

    const navigate = useNavigate();
    const { handleAddStore, setIsComplete, isComplete, loadMoreProducts  } = useProductContext();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const handleGoToDetails = (product) => {
        navigate(`/lubricantes/${product._id}`);
        return;
    };

    const handleAddToCart = (product) => {
        setIsComplete(true);
        product.quantity = 1;
        delete product.characteristics;
        handleAddStore(product);
        setTimeout(() => {
        setIsComplete(false);
        }, 1000);

        return;
    };

    const handleMoreProducts = () => {
        setLoadingProducts(true)
        loadMoreProducts().then(response =>{
            if(response==="ok") setLoadingProducts(false)
        })

    }

    return {selectedProductId, setSelectedProductId, handleAddStore, handleGoToDetails, handleAddToCart, isComplete, handleMoreProducts, loadingProducts}

}