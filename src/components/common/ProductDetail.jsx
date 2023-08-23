import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Characteristics from './Characteristics'
import Currency from './CurrencyFormater';
import InfoUser from './FormModal'
import Rating from './ProductDetails/Rating'
import ProductImages from './ProductDetails/ProductImage'
import Share from './ShareProduct';
import "../css/style_products.css"

const ProductDetail = ({product}) => {

  const { 
      isLoading, setIsLoading,
      isComplete, setIsComplete,
      productDetail, setProductDetail,
      modalPayment, setModalPayment,
      productPurchased, setProductPurchased,
    } = useProductContext();

    
  const { name, price, description, image, stars } = product;
  
  const [quantity, setQuantity] = useState(1);
  const [characteristics, setCharacteristics] = useState(product.characteristics);

  useEffect(()=>{
    setProductDetail(product);
    const {characteristics, ...productSelected} = product;
    productSelected.quantity = 1;
    setProductPurchased(productSelected);
    console.log(product, "tamaño de array")
  },[product])

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setProductPurchased(prevProduct => ({
      ...prevProduct,
      quantity: newQuantity
    }));
  };

  const handleShowModal = () => {
    setModalPayment(true);
  };

  const handleAddStore = () => {
    let store = JSON.parse(localStorage.getItem('store')) || [] ;
    if(!store) localStorage.setItem('store',JSON.stringify(productPurchased))
    else{
      const isItemExist   = !store.find(item => item.size === productPurchased.size && item.color == productPurchased.color && item.name === productPurchased.name) || !store.find(item =>item.name === productPurchased.name) ? false : true ;
      if(!isItemExist) localStorage.setItem('store',JSON.stringify([...store, productPurchased]));
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);

      setTimeout(() => {
        setIsComplete(false);
      }, 1000);
    }, 1000);
  }

  return (
    <>
      <Row className='p-3 product-details-columns'>
        <ProductImages image={image} />
        <Col md={4} >
          <div className='purchase-info'>
            <h2>{name}</h2>
              <Rating stars={stars}/>
              <h4 className="text-muted">Precio: $<Currency amount={price} className='mt-3'/></h4>
              <p>{description}</p>
            {
              characteristics.length > 0  && (
                <Characteristics product={product}/>
              )
            }
            <Form.Group>
              <Form.Label>Cantidad:</Form.Label>
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-secondary"
                  className='ds-buttons'
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  value={quantity}
                  onChange={e => handleQuantityChange(e.target.value)}
                  min={1}
                  className="mx-2 input-quantity ds-buttons"
                  disabled="disabled"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleQuantityChange(Math.max(1, quantity + 1))}
                  className='ds-buttons'
                >
                  +
                </Button>
                <Share/>
              </div>
            </Form.Group>
              {modalPayment && <InfoUser product={productPurchased}/>}
            <div className='shopping-buttons'>
              <Button 
                variant={isComplete ? 'success' : 'primary'}
                disabled={isLoading} 
                onClick={handleAddStore}
                className='mt-3 me-2 w-50'
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : isComplete ? (
                  'Añadido ✅'
                ) : (
                  'Añadir al carrito 🛒'
                )}
              </Button>
              <Button
                variant='success'
                className='mt-2 w-50'
                onClick={handleShowModal}
                >
                Comprar Ahora
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
