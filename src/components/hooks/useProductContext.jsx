import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext.jsx";

const useProductContext = () => {
    return useContext(ProductContext);
};

export default useProductContext;