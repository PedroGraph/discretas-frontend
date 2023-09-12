import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Characteristics from './Characteristics'
import Currency from './CurrencyFormater';
import InfoUser from './FormModal'
import Rating from './ProductDetails/Rating'
import ProductImages from './ProductDetails/ProductImage'
import Share from './ShareProduct';
import Carousel from './ProductDetails/Carousel';
import "../css/style_products.css"
import ImageModalZoom from './imageModal';

const ProductDetail = ({product}) => {

  const { 
      isLoading,
      isComplete, 
      setProductDetail,
      modalPayment, setModalPayment,
      productPurchased, setProductPurchased,
      handleAddStore,
      imageModal,
      handleAddWishList,
      isAddedToWishList
    } = useProductContext();

    
  const { name, price, description, image, stars } = product;
  
  const [quantity, setQuantity] = useState(1);
  const [characteristics, setCharacteristics] = useState(product.characteristics);

  useEffect(()=>{
    setProductDetail(product);
    const {characteristics, ...productSelected} = product;
    productSelected.quantity = 1;
    setProductPurchased(productSelected);
  },[product])

  const handleQuantityChange = (newQuantity) => {
    if(newQuantity > 0 ) setQuantity(newQuantity);
    setProductPurchased(prevProduct => ({
      ...prevProduct,
      quantity: newQuantity<=0 ? 1 : newQuantity
    }));
  };

  const handleShowModal = () => {
    setModalPayment(true);
  };

  const handleAddProductToWishList = (event) =>{
    event.preventDefault();
    handleAddWishList(product)
  }

  return (
    <>
      <div className='p-3 product-details-columns'>
        <div className='d-flex justify-content-center'>
          <Carousel pics={image} slides={image.length}/>
        </div>
        
        <div className='col-md-5'>
          <div className='purchase-info'>
            <div className='d-flex '>
              <h3>{name}</h3> 
              <svg className={!isAddedToWishList(product._id) ? 'wishlist-details' : 'wishlist-details-activated'} onClick={(e) => {handleAddProductToWishList(e)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
              </svg> 
              <span>
                {!isAddedToWishList(product._id) ? 'Añadir a la lista de deseos' : 'Añadido a tu lista de deseos'}
              </span>
            </div>
            <p>{description}</p>
             <div className=' price-rating d-flex'>
              <div>
                <h4 className="text-muted">
                  $<Currency amount={price} className='mt-3'/>
                </h4>
              </div>
              <Rating product={product._id} stars={stars}/>
             </div>
              
         
            {
              characteristics.length > 0  && (
                <Characteristics product={product}/>
              )
            }
            <Form.Group>
              <Form.Label>Cantidad:</Form.Label>
              <div className="quantity-section">
                <div className='d-flex'>
                  <Button
                    variant="outline-secondary"
                    className='ds-buttons'
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity < 2 ? 'disabled' : ''}
                  >
                    -
                  </Button>
                  <Form.Control
                    type="text"
                    value={quantity}
                    onChange={e => handleQuantityChange(e.target.value)}
                    min={1}
                    className="input-quantity ds-buttons"
                    disabled="disabled"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(Math.max(1, quantity + 1))}
                    className='ds-buttons'
                  >
                    +
                  </Button>
                </div>
                <div className='d-flex'>
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
              {modalPayment && <InfoUser product={productPurchased}/>}
              <ImageModalZoom/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
