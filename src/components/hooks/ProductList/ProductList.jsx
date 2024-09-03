import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "../useProductContext";

export const ProductListTools = () => {

    const navigate = useNavigate();
    const { setIsComplete, isComplete, loadMoreProducts  } = useProductContext();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const handleGoToDetails = (product) => {
        navigate(`/lubricante/${product.id}`);
        return;
    };

  

    const handleMoreProducts = () => {
        setLoadingProducts(true)
        loadMoreProducts().then(response =>{
            if(response==="ok") setLoadingProducts(false)
        })

    }

    return {selectedProductId, setSelectedProductId, handleGoToDetails, handleAddToCart, isComplete, handleMoreProducts, loadingProducts}

}