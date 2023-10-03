import React from "react";
import { Details } from '../hooks/ProductDetails/ProductDetails';
const ProductDescription = ({description}) => {

    const {product} = Details();

    return (
        <div className="ps-5">
            <h2>Detalles del Producto</h2>
            <p>
            Since it’s creation lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
            {Object.keys(product).length > 0 && (
                <>
                    {/* <img src={product.image[0]} alt="" style={{width: "600px", height: "400px"}}/> */}
                    {/* <img src={product.image[1]} alt="" style={{width: "600px", height: "400px"}}/> */}
                </>
            )}
        </div>
    )

}

export default ProductDescription;