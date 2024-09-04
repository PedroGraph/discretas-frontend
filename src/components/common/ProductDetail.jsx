
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Currency from './CurrencyFormater';
import Carousel from './ProductDetails/Carousel';
import "../css/style_products.css"
import { Details } from '../hooks/ProductDetails/ProductDetails';
import {MainLoader}  from './Loader';
import Modal from './Modal'
import RelatedProduct from './RelatedProducts';

const ProductDetail = () => {

  const { modalPayment } = useProductContext();

  const bgColors = {
    Red : "bg-red-400",
    Green: "bg-green-400",
    Blue: "bg-blue-400",
    Orange: "bg-orange-400",
    RedSelected: "bg-red-500",
    GreenSelected: "bg-green-500",
    BlueSelected: "bg-blue-500",
    OrangeSelected: "bg-orange-500"
  }

  const { 
    product, quantity, isComplete, setEnableSection, enabledSection,
    quantityToAdd, setQuantityToAdd,
    selectedColor, selectedSize, setSelectedColor, setSelectedSize,
    isLoading, handleQuantityChange, handleShowModal, handleAddToCart
  } = Details();
  
  const { name, price, images, stars, characteristics } = product;
  const randomStars = Math.floor(Math.random() * 5) + 1;

  const handleModalPayment = () => {
    handleShowModal();
  }

  return (
    <>
      {Object.keys(product).length === 0 ? (
        <div className='max-h-[100vh]'>
          <MainLoader/>
        </div>
      ):(
        <div className='grid grid-cols-1 place-items-center bg-gray-200 w-full'>
          <div className='xs:w-full lg:w-3/4 bg-white flex xs:flex-col lg:flex-row xs:gap-4 lg:gap-10 xs:px-4 lg:px-10 max-w-[2000px]'>
            <div className='flex justify-center gap-4 lg:w-2/4 xs:w-full'>
              <Carousel pics={images.map((photo) => { return photo.imageName })} slides={images?.length}/>
            </div>
            <div className='flex flex-col lg:mt-[1em] lg:w-2/4 xs:w-full gap-3'>
              <span className='w-full ps-2 lg:text-2xl lg:font-bold sm:text-xl'>{name}</span>
              <div className='flex gap-2 items-end'>
                <Currency amount={price} className={"text-2xl font-bold ps-2 pb-0 mb-0"} currency={true}/>
                <span className='text-sm mb-0.5 text-red-500'>{Math.floor(Math.random() * 99) + 1}% de dto</span>
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
              <div className='d-flex flex-col xs:gap-2  lg:gap-5'>
                <div>
                {characteristics && characteristics.length > 0 && <span className='ps-2 text-sm'>Color seleccionado: </span>}
                <div className='d-flex ps-2 gap-2 '>
                  {
                     characteristics && characteristics.length > 0 && characteristics.map((items, index) => {
                      const color = items.color === selectedColor ? bgColors[items.color + "Selected"] : bgColors[items.color];
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
                </div>
                <div>
                  {characteristics && characteristics.length > 0 && <span className='ps-2 text-sm'>Talla seleccionada: </span>}
                  <div className='d-flex gap-2 ps-2'>
                    {
                      characteristics && characteristics.length > 0 && characteristics.map(items => {
                        const sizes = items.color === selectedColor ? items.size : [];
                        return sizes.map((size, index) => {
                        return (<span key={index} onClick={() => setSelectedSize(size)} className={`border-2 rounded h-10 w-10 text-center p-1 ${selectedSize === size ? "bg-black text-white" : "bg-gray-200"}`}>
                          <span className='text-sm font-bold'>{size}</span>
                        </span>)
                        })
                      })
                    }
                  </div>
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
          <section className='pt-10 xs:w-full lg:w-3/4 bg-white flex xs:flex-col gap-10 px-10 max-w-[2000px] justify-between'>
            <div className='w-full flex '>
              <span className='font-bold text-center border-b-2 w-1/2 xl:text-xl py-2'><span className={`cursor-pointer py-2 ${enabledSection === 'Description' ? 'border-b-4 w-1/2 border-black px-10' : ''}`} onClick={() => setEnableSection("Description")}>Descripción del producto</span></span>
              <span className='font-bold text-center border-b-2 w-1/2 xl:text-xl py-2'><span className={`cursor-pointer py-2 ${enabledSection === 'Comments' ? 'border-b-4 w-1/2 border-black px-10' : ''}`} onClick={() => setEnableSection("Comments")}>Comentarios</span></span>
            </div>
            <div className={`flex flex-col gap-3 ${enabledSection === 'Description' ? 'block' : 'hidden'}`}>
              <span>{product.description}</span>
              <img className="h-full w-[500px]" src={product.images[0].imageName} alt={product.name+"_"+product.id}/>
            </div>
            <div className={`flex flex-col gap-3 ${enabledSection === 'Comments' ? 'block' : 'hidden'}`}>
              <span>{product.description}</span>
              <img className="h-full w-[500px]" src={product?.images[1]?.imageName} alt={product.name+"_"+product.id}/>
            </div>
          </section>
          <section className='pt-10 xs:w-full lg:w-3/4 bg-white flex xs:flex-col gap-10 px-10 max-w-[2000px] justify-between'>
            <RelatedProduct relatedProducts={4}/>  
          </section>
        </div>
      )}
      {/* <WhatsappBubble/> */}
    </>
  );
};

export default ProductDetail;
