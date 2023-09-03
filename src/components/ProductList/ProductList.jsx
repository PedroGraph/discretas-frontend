import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Currency from '../common/CurrencyFormater';
import '../css/style_products.css';
import { ProductListTools } from '../hooks/ProductList/ProductList';

const ProductList = ({ products }) => {
  
  const {selectedProductId, setSelectedProductId, handleGoToDetails, handleAddToCart, isComplete} = ProductListTools()

  return (
    <Row className='product-list-box'>
      {products.map((product, index) => (
        <Col key={index} className='product-col'>
          <Card className="cards-list">
            <Link to={"/lubricantes/"+product._id} className='product-link' style={{textDecoration:"none", color: "black"}}>
              <Card.Img variant="top" src={product.image[0]} />
              <Card.Body>
                <Card.Title style={{fontWeight: "600"}}>{product.name}</Card.Title>
                <Card.Text className='product-description'>{product.description}</Card.Text>
                <Card.Text>Precio: $<Currency amount={product.price}/></Card.Text>
                <div className="star-options">
                  {[1, 2, 3, 4, 5].map(stars => (
                    <span
                      key={stars}
                      className={`star ${stars <= product.stars ? 'selected' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Link>
            <div className='p-1 look-product-button'>
              <Button className='p-2' onClick={() => { handleGoToDetails(product); }}>Ver producto</Button>
              {selectedProductId === product._id && isComplete ? (
                <Button key={index} className='p-2 bg-success'>✅</Button>
              ) : (
                <Button
                  key={index}
                  className='p-2'
                  onClick={() => {
                    setSelectedProductId(product._id);
                    handleAddToCart(product);
                  }}
                >
                  Añadir al 🛒
                </Button>
              )}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
