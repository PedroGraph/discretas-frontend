import React from 'react';
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
      isLoading,
      isComplete, 
      modalPayment, 
      handleAddStore,
      isAddedToWishList
    } = useProductContext();

  const {product, quantity, characteristics, handleQuantityChange, handleAddProductToWishList, handleShowModal} = Details();
  const { name, price, image, stars } = product;

  return (
    <>
      {Object.keys(product).length === 0 ? (
        <div style={{minHeight: "600px"}}>
          <MainLoader/>
        </div>
        
      ):(
        <div className='p-3 product-details-columns'>
          <div className='d-flex justify-content-center'>
            <Carousel pics={image} slides={image?.length}/>
          </div>
          <div className='col-md-5'>
            <div className='purchase-info'>
              <div>
                <div className='d-flex justify-content-between'>
                  <h4>{name}</h4> 
                  <div className='wishlist-info'>   
                    <svg className={!isAddedToWishList(product._id) ? 'wishlist-details' : 'wishlist-details-activated'} onClick={(e) => {handleAddProductToWishList(e)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                    </svg> 
                    <span>
                      {!isAddedToWishList(product._id) ? 'Añadir a la lista de deseos' : 'Añadido a tu lista de deseos'}
                    </span>
                  </div>
              
                </div>
                <Rating product={product._id} stars={stars}/>
                  <div className=' price-rating d-flex'>
                    <div>
                      <h4 className="text-muted">
                        $<Currency amount={price} className='mt-3'/>
                      </h4>
                    </div>
                  </div>
              </div>
              {
                characteristics.length > 0  && (
                  <Characteristics product={product}/>
                )
              }
              <Form.Group className='mt-3 mb-3'>
                <Form.Label>Cantidad:</Form.Label>
                <div className="quantity-section">
                  <div className='d-flex set-quantity'>
                    <Button
                      variant="outline-secondary"
                      className='ds-buttons'
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity < 2 ? 'disabled' : ''}
                    >
                      <p>-</p>
                    </Button>
                    <Form.Control
                      type="text"
                      value={quantity}
                      onChange={e => handleQuantityChange(e.target.value)}
                      min={1}
                      className="input-quantity ds-buttons"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleQuantityChange(Math.max(1, quantity + 1))}
                      className='ds-buttons'
                    >
                      <p>+</p>
                    </Button>
                  </div>
                  <div className='d-flex buybuttons'>
                    <Button 
                      variant={isComplete ? 'success' : 'dark'}
                      disabled={isLoading} 
                      onClick={handleAddStore}
                      className='mx-2'
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : isComplete ? (
                        'Añadido ✅'
                      ) : (
                        'Añadir al carrito'
                      )}
                    </Button>
                    <Button
                      variant='dark'
                      onClick={handleShowModal}
                      >
                      Comprar Ahora
                    </Button>
                  </div>
                
                  {/* <Share/> */}
                </div>
              </Form.Group>
                {modalPayment && <Modal product={product}/>}
                <ImageModalZoom/>
            </div>
          </div>
        </div>
      )}
      <WhatsappBubble/>
    </>
  );
};

export default ProductDetail;
