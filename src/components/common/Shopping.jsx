import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import imageStore1 from '../../../image/image-store1.jpg'
import imageStore2 from '../../../image/image-store2.jpg'
import { useNavigate, useLocation  } from 'react-router-dom';
import Store from './Store';
import WishList from './WishList';
import '../css/style_products.css'
import '../css/store.css'

const Shopping = () => {

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
      {"/store" === location.pathname && (
          <Store/>
      )}
       {"/wishlist" === location.pathname && (
          <WishList/>
      )}
    </div>
  );
};

export default Shopping;
