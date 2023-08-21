import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Currency from '../common/CurrencyFormater';
import '../css/style_products.css';

const ProductList = ({ products }) => {

  return (
    <Row className='product-list-box'>
      {products.map((product, index) => (
        <Col key={index} className='product-col'>
          <Card className="cards-list" >
            <a href={"/products/"+product._id} style={{textDecoration:"none", color: "black"}}>
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
            <div className='p-3 look-product-button'>
              <Button className='p-2 w-100'>Echar un vistazo</Button>
            </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
