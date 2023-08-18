import React, {useEffect, useState} from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Currency from './CurrencyFormater';
import StarRating from './StarRating';

const ProductList = ({ products }) => {

  const [resolution, setResolution] = useState(window.innerWidth);

  const updateResolution = () => {
    setResolution(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateResolution);
    return () => {
      window.removeEventListener('resize', updateResolution);
    };
  }, []);

  return (
    <Row>
      {products.map((product, index) => (
        <Col key={index} md={resolution >= 340 && resolution < 1366 ? 6 : resolution >= 1366 && resolution < 1760 ? 6 : 3}>
          <Card className="mb-4" style={{width: "19em"}}>
            <a href={"/products/"+product._id} style={{textDecoration:"none", color: "black"}}>
            <Card.Img variant="top" src={product.image[0]} />
            <Card.Body>
              <Card.Title style={{fontWeight: "600"}}>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Precio: $<Currency amount={product.price}/></Card.Text>
              <StarRating rating={product.stars} /> 
            </Card.Body> 
            <div className='p-3'>
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
