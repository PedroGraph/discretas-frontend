import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import backImage from '../../../image/pexels-cottonbro-studio-8731342.jpg'
import { useNavigate, useLocation  } from 'react-router-dom';
import Store from './Store';
import WishList from './WishList';
import '../css/style_products.css'
import '../css/store.css'

const OrderSection = () => {

  const { modalPayment  } = useProductContext()

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>{
    if(modalPayment) setLoading(true);
    else setLoading(false);
  },[modalPayment]);
  
 
  return (
     
    <div style={{backgroundColor: "rgb(248 248 248)"}}>
      <div className='image-store-container'>
        <img src={backImage} alt="" className='image-store'/>
        <span>{
          "/store" === location.pathname ? 'Carrito de Compras' : 'Lista de Deseos'
        }</span>
      </div>
      <div className='store-section p-5 d-flex justify-content-center'>
        <div className={"/store" === location.pathname ? 'store-section-active' : ''} onClick={(e)=>{navigate('/store')}}>Productos</div>
        <div className={"/wishlist" === location.pathname ? 'store-section-active' : ''}onClick={(e)=>{navigate('/wishlist')}}>Lista de Deseos</div>
      </div>
      {"/store" === location.pathname && (
          <Store/>
      )}
       {"/wishlist" === location.pathname && (
          <WishList/>
      )}
    </div>
  );
};

export default OrderSection;
