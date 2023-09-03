import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "../useProductContext";

export const ProductListTools = () => {

    const navigate = useNavigate();
    const { handleAddStore, setIsComplete, isComplete  } = useProductContext();
    const [selectedProductId, setSelectedProductId] = useState(null);

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

    return {selectedProductId, setSelectedProductId, handleAddStore, handleGoToDetails, handleAddToCart, isComplete}

}