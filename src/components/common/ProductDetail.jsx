
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Characteristics from './Characteristics'
import Currency from './CurrencyFormater';
import WhatsappBubble from './WhatsappBubble';
import Rating from './ProductDetails/Rating'
import Carousel from './ProductDetails/Carousel';
import "../css/style_products.css"
import ImageModalZoom from './imageModal';
import { Details } from '../hooks/ProductDetails/ProductDetails';
import {MainLoader}  from './Loader';
import Modal from './Modal'

const ProductDetail = () => {

  const { 
      modalPayment, 
      handleAddStore,
      isAddedToWishList,
      userLogged
    } = useProductContext();

  const { 
    product, quantity, isComplete, 
    quantityToAdd, setQuantityToAdd,
    selectedColor, selectedSize, setSelectedColor, setSelectedSize,
    isLoading, setIsComplete, 
    setIsLoading, handleQuantityChange, 
    handleAddProductToWishList, handleShowModal, handleAddToCart
  } = Details();
  
  const { name, price, images, stars, characteristics } = product;
  const randomStars = Math.floor(Math.random() * 5) + 1;


  useEffect(() => {
    handleQuantityChange(quantityToAdd);
  }, [quantityToAdd]);

  useEffect(() => {
    if (characteristics){
      setSelectedColor(characteristics[0]?.color);
      setSelectedSize(characteristics[0].size[0]);
    }
  }, [product]);

  const handleModalPayment = () => {
    handleShowModal();
  }

  return (
    <>
      {Object.keys(product).length === 0 ? (
        <div style={{minHeight: "600px"}}>
          <MainLoader/>
        </div>
        
      ):(
        <div className='d-flex xs:flex-col lg:bg-gray-200 lg:flex-row xs:gap-2 lg:gap-10 lg:justify-center lg:h-screen'>
          <div className='d-flex justify-content-center'>
            <Carousel pics={images.map((photo) => { return photo.imageName })} slides={images?.length}/>
          </div>
          <div className='lg:w-2/6 lg:max-w-[600px] lg:mt-[70px] bg-white lg:px-4 pt-2 rounded'>
            <div className='d-flex flex-col gap-4'>
              <div className='d-flex items-end xs:gap-4 lg:gap-2 lg:order-2'>
                <Currency amount={price} className={"text-2xl font-bold ps-2 pb-0 mb-0"} currency={true}/>
                <span className='text-sm mb-0.5 text-red-500'>{Math.floor(Math.random() * 99) + 1}% de dto</span>
              </div>
              <span className='ps-2 lg:order-1 lg:text-2xl lg:font-bold sm:text-xl'>{name}</span>
            </div>
            <div className='ps-2 flex items-center'>
              <div>
              {
                [1, 2, 3, 4, 5].map((star, index) => {
                  return (
                    <span
                    key={index}
                    className={`star ${stars <= randomStars ? 'selected' : ''}`}
                    style={{fontSize: "14px"}}
                  >
                    ★
                  </span>
                  )
                })
              }
              </div>
              <span className='text-xs lg:text-sm mt-0.5'>({randomStars}) calificaciones | {Math.floor(Math.random() * 9999) + 1}+ vendidos </span>
            </div>
            <div className='d-flex flex-col xs:gap-2 lg:pt-4 lg:gap-5'>
              <span className='ps-2 text-sm'>Color seleccionado: </span>
              <div className='d-flex ps-2 gap-2 '>
                {
                  characteristics.length > 0 &&characteristics.map((items, index) => {
                    const color = `bg-${items.color.toLowerCase()}-${selectedColor === items.color ? "500" : "400"}`
                    return(
                    <span key={index} className={`border-2 rounded ${color} h-10 w-10 p-1`} onClick={() => setSelectedColor(items.color)}>
                      {items.color === selectedColor && (
                      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      )}
                    </span>
                    )
                  })
                } 
              </div>
              <span className='ps-2 text-sm'>Talla seleccionada: </span>
              <div className='d-flex gap-2 ps-2'>
                {
                  characteristics.length > 0 && characteristics.map(items => {
                    const sizes = items.color === selectedColor ? items.size : [];
                    return sizes.map((size, index) => {
                    return (<span key={index} onClick={() => setSelectedSize(size)} className={`border-2 rounded h-10 w-10 text-center p-1 ${selectedSize === size ? "bg-black text-white" : "bg-gray-200"}`}>
                      <span className='text-xs'>{size}</span>
                    </span>)
                    })
                  })
                }
              </div>
              <div className='d-flex px-2 py-2 items-center'>
                <button className='h-8 w-8 bg-gray-200 p-0'><span className='text-xl text-black rounded-l' onClick={() => quantityToAdd > 0 && setQuantityToAdd(quantityToAdd - 1)}>-</span></button>
                <input type="number" value={quantityToAdd} className='border-l-0 border-r-0 h-8 w-12 rounded-l-none rounded-r-none text-center' />
                <button className='h-8 w-8 bg-gray-200 p-0'><span className='text-xl text-black' onClick={() => quantityToAdd <= quantity && setQuantityToAdd(quantityToAdd + 1)}>+</span></button>
                <span className='ms-2 text-xs'>({quantity > 10 ? "10+" : quantity}) Unidad{quantity > 1 ? "es" : ""} disponible{quantity > 1 ? "s" : ""}</span>
              </div>
              <div className='d-flex xs:flex-col lg:flex-row xs:gap-2 lg:gap-4 px-2'>
                <button className={`${isComplete ? "bg-green-400" : "bg-black"} rounded min-w-[8rem]`} onClick={handleAddToCart}>
                  {
                    isLoading ? <Spinner className='h-5 w-5' /> : isComplete ? "✅" : "Agregar al carrito"
                  }
                </button>
                <button className='bg-blue-500 rounded' onClick={handleModalPayment}>Comprar ahora</button>
              </div>
              {
                modalPayment && (
                  <Modal show={product} /> 
                )
              }
                
            </div>
          </div>
          
        </div>
      )}
      {/* <WhatsappBubble/> */}
    </>
  );
};

export default ProductDetail;
