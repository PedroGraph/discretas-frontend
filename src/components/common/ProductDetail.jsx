import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Characteristics from './Characteristics'
import Currency from './CurrencyFormater';
import InfoUser from './ProductDetails/FormModal'
import axios from 'axios'
import "../css/style_products.css"

const ProductDetail = ({product}) => {

  const { _id, name, price, description, image, rating, stars } = product;

  const [currentRating, setCurrentRating] = useState(Math.floor(rating));
  const [hasHalfStar, setHasHalfStar] = useState(rating - Math.floor(rating) >= 0.25);
  const [selectedImage, setSelectedImage] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [characteristics, setCharacteristics] = useState(product.characteristics);
  const [purchaseWithCharacteristics, setPurchaseWithCharacteristics] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setSelectedImage(image[0]);
    // console.log(__BACKEND_URL__)
    // // const url = `https://discretas-backend.onrender.com/rating/2323`;
    // // const data = {
    // //   stars: 5
    // // };

    // // axios.put(url, data)
    // //   .then(response => {
    // //     console.log('Respuesta del servidor:', response.data);
    // //   })
    // //   .catch(error => {
    // //     console.error('Error en la petición:', error);
    // //   });
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
 
  const [zoomStyle, setZoomStyle] = useState({
    transform: 'scale(1) translate(0, 0)',
  });

  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const scaleRatio = 1.8; 

    const translateX = offsetX * (scaleRatio - 1);
    const translateY = offsetY * (scaleRatio - 1);

    setZoomStyle({
      transform: `scale(${scaleRatio}) translate(${-translateX}px, ${-translateY}px)`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1) translate(0, 0)',
      maxWidth: "600px"
    });
  };

  const generateRatingStars = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FaStar
            key={i}
            onClick={() => handleStarClick(i + 1)}
            style={{ cursor: 'pointer' }}
          />
        );
      } else if (i === Math.floor(rating) && hasHalfStar) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            onClick={() => handleStarClick(i + 0.5)}
            style={{ cursor: 'pointer' }}
          />
        );
      } else {
        stars.push(
          <FaRegStar
            key={i}
            onClick={() => handleStarClick(i + 1)}
            style={{ cursor: 'pointer' }}
          />
        );
      }
    }

    return stars;
  };

  const handleStarClick = (selectedRating) => {
    setCurrentRating(Math.floor(selectedRating));
    setHasHalfStar(selectedRating - Math.floor(selectedRating) >= 0.25);
  };

  const handleAddStore = () => {
    let store = JSON.parse(localStorage.getItem('store')) || [] ;
    const addProduct = {
      id: _id,
      name: name,
      total: price,
      imageUrl: image[0],
      quantity: quantity,
      ...(purchaseWithCharacteristics)
      
    }

    if(!store) localStorage.setItem('store',JSON.stringify(addProduct))
    else{

      const isItemExist   = !store.find(item => item.size === addProduct.size && item.color == addProduct.color && item.name === addProduct.name) || !store.find(item =>item.name === addProduct.name) ? false : true ;
      if(!isItemExist) localStorage.setItem('store',JSON.stringify([...store, addProduct]));
     
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
      <Row className='m-5' style={{minHeight: "600px"}}>
      <Col md={3}>
          <div className='image-section'>
            {image.map((images, index) => (
              <Row
                key={index}
                className={selectedImage === images ? 'image-thumbnail m-1 image-bordered' : 'image-thumbnail m-1'}
                onClick={() => handleImageClick(images)}
                style={{minWidth: "90%"}}
              >
                <img src={images} alt={`Image ${index}`} style={{minWidth: "90%"}}/>
              </Row>
            ))}
          </div>
        </Col>
        <Col md={6} style={{maxWidth: "35%"}}
        className="image-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        >
          {selectedImage && (
            <div className="selected-image">
              <img src={selectedImage} alt={name} 
                className="zoom-image"
                style={zoomStyle} />
            </div>
          )}
        </Col>
        <Col md={4} >
          <div style={{marginLeft: "30%"}}>
            <h2>{name}</h2>
            <div >
              <div className="rating">{generateRatingStars(currentRating)}</div>
              <div style={{marginLeft: "5px"}}>Calificaciones ({stars})</div>
            </div>
            <br></br>
            <h4 className="text-muted">Precio: $<Currency amount={price}/></h4>
            <br></br>
            <p>{description}</p>
            {
              characteristics && (
                <Characteristics product={characteristics} purchase={setPurchaseWithCharacteristics}/>
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
              </div>
            </Form.Group>
            <InfoUser/>
            <Button 
              variant={isComplete ? 'success' : 'primary'}
              disabled={isLoading} 
              onClick={handleAddStore}
              className='w-100 mt-4'
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
              className='mt-2 w-100'>
              Comprar Ahora
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
