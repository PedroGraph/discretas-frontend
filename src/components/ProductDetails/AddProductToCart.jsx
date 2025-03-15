import PropTypes from 'prop-types';
import Loader from '../loader';
import { ShoppingBag, X, CheckIcon } from "lucide-react";

export default function AddProductToCart({ handleAddProductToCart, isDone, loadingButton, errorButton, className }) {
    const baseClasses = `h-10 text-white rounded flex justify-center items-center lg:gap-0 xl:gap-2 ${className}`;
    const buttonClasses = loadingButton ? "bg-black" : "bg-[#8941ff]";
    
    return (
        <button
            className={`${baseClasses} ${buttonClasses}`}
            onClick={handleAddProductToCart}
            aria-label={loadingButton ? "Añadiendo al carrito" : "Añadir al carrito"}
            disabled={loadingButton}
        >
            {loadingButton && <Loader className="h-5 w-5" />}
            {errorButton && <X className="text-red-500" />}
            {isDone && <CheckIcon className="text-green-500" />}
            {!loadingButton && !isDone && !errorButton && (
                <>
                    <ShoppingBag className="h-3" />
                    <span className='xl:text-base lg:text-xs'>Añadir al carrito</span>
                </>
            )}
        </button>
    );
}

AddProductToCart.propTypes = {
    handleAddProductToCart: PropTypes.func.isRequired,
    isDone: PropTypes.bool,
    loadingButton: PropTypes.bool,
    errorButton: PropTypes.bool
};
