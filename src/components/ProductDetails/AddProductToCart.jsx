import PropTypes from 'prop-types';
import { useState } from 'react';
import { addProductToShoppingCart } from '../../services/shoppingCartService';
import Loader from '../loader';
import { shoppingCartFormat } from '../../utils/formats';

export default function AddProductToCart({product}) {

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isError, setIsError] = useState(null);

    const handleAddProductToCart = async () => {
        setIsLoading(true);
        try {
            const shoppingCartData = shoppingCartFormat({userId: "dec0acd7-49d9-48df-ba81-fb927f2e9ea7", ...product});
            await addProductToShoppingCart(shoppingCartData);
            setIsDone(true);
            setTimeout(() => {
                setIsDone(false);
            }, 2000);
        } catch (error) {
            setIsError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <button className={`xs:w-full 2xl:w-1/4 h-10 ${isLoading ? "bg-[#000]" : "bg-[#8941ff]"}  text-white rounded`} onClick={handleAddProductToCart}>
            {isLoading && <Loader className={"h-5 w-5"}/>}
            {isError && "❌"}
            {isDone && "✅"}
            {!isLoading && !isDone && "Añadir al carrito"}
        </button>
    )
}

AddProductToCart.propTypes = {
    product: PropTypes.object.isRequired
}