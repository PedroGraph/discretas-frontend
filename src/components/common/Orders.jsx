import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import imageStore1 from '../../../image/image-store1.jpg'
import imageStore2 from '../../../image/image-store2.jpg'
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
  
  const backImage = [
    imageStore1,
    imageStore2
  ];

  const imageSelected = Math.floor(Math.random() * backImage.length) ;
 
  return (
     
    <div style={{backgroundColor: "rgb(248 248 248)"}}>
      <div className='image-store-container'>
        <img src={backImage[imageSelected]} alt="" className='image-store'/>
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
