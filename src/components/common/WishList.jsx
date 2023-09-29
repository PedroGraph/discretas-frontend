import React, {useState, useEffect} from "react";
import useProductContext from "../hooks/useProductContext";
import Currency from "./CurrencyFormater";
import { Link } from "react-router-dom";
import '../css/wishlist.css'

const WishList = () =>{
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const [wishListItems, setWishListItems] = useState(wishlist);

    const {
        handleAddStore,
        handleAddWishList,
    } = useProductContext();

    const handleDeleteWishLitProduct = (index) =>{
        console.log(index);
        setWishListItems(prevItems =>{
            const items = [...prevItems];
            items.splice(index, 1); 
            localStorage.setItem('wishlist', JSON.stringify(items));
            return items; 
        })
    }

    const handleAddProductToStore = (product, index) =>{
        product.quantity = 1;
        delete product.characteristics;
        handleAddStore(product);
        setWishListItems(prevItems =>{
            const items = [...prevItems];
            items.splice(index, 1); 
            localStorage.setItem('wishlist', JSON.stringify(items));
            return items; 
        })
    }

    return(
        <>
            <div className="d-flex p-3 justify-content-center align-items-center wishlist-section flex-column">
                { wishListItems.length > 0 && (
                <div className='p-5 pb-1 d-flex align-items-center justify-content-center bg-white'>
                  <div className='d-flex p-3 justify-content-start wishlist-section-title'>
                    <span className="col-md-5 text-center">Producto</span>
                    <span className="col-md-4 text-center ps-3">Precio</span>
                  </div>
                </div>
                )}

              {
                wishListItems.length > 0 ? (
                    <div className='p-5 pt-2 pb-1 d-flex align-items-center justify-content-center bg-white flex-column'>
                      
                        {
                            wishListItems.map((item, index) =>(
                                <div key={index} className='d-flex p-3 justify-content-start wishlist-section-items'>
                                    <div className="col-md-5 d-flex">
                                    <Link to={`/lubricantes/${item._id}`} className="d-flex">
                                      <div>
                                        <img src={item.image[0]} alt="" />
                                      </div>
                                      <div className="d-flex justify-content-start">
                                        <p className="">{item.name}</p>
                                      </div>
                                    </Link>
                                    </div>
                                    <div className="col-md-4 text-center ps-3"><Currency amount={item.price}/></div>
                                    <div>
                                        <button onClick={() =>{handleAddProductToStore(item, index)}}>
                                            Añadir al carrito
                                        </button>
                                    </div>
                                    <div className="mx-5" onClick={() =>{handleDeleteWishLitProduct(index)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                                            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                      
                    </div>
                ):(
                    <div className="d-flex align-items-center flex-column p-5"> 
                        <h3 className="text-center">¿Quieres ver nuestros productos? Haz clic acá</h3>
                        <button className="w-10" onClick={(e) =>{navigate('/')}}>Let's Go</button>
                    </div>
                )
              }
            </div>
        </>
    )

}

export default WishList;