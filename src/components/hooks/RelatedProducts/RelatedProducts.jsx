import React, {useState, useEffect} from "react";
import RelatedProduct from "../../services/RelatedProdcts";

export const getRelatedProduct = () => {

    const [ relatedProducts, setRelatedProduct] = useState([]);

    useEffect(()=>{
        RelatedProduct().then(response =>{
            setRelatedProduct(response)
        })
    },[])


    return {relatedProducts}

}