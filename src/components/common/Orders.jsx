import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Currency from './CurrencyFormater'
import Payment from './Payment'
import InfoUser from './FormModal'
import '../css/style_products.css'

const OrderSection = () => {

  const { modalPayment, setModalPayment } = useProductContext()
  const shopping = JSON.parse(localStorage.getItem('store')) || [];
  const [orderItems, setOrderItems] = useState(shopping);
  const [ordered, setOrdered] = useState(false);
  

  const handleQuantityChange = (id, newQuantity) => {
    console.log(id, newQuantity)
    setOrderItems(prevItems =>
      prevItems.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleShowModal = () => {
    setModalPayment(true);
  };

  const handleDeleteItem = (id) => {
    setOrderItems(prevItems =>{
      const newArray = [...prevItems]; // Crear una copia del array existente
      newArray.splice(id, 1); 
      localStorage.setItem('store', JSON.stringify(newArray));
      return newArray; 
    });
  };

  const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  return (
    <Container className="mt-4 mb-5" style={{minHeight: "800px", borderRadius: "2%", backgroundColor: "#ffffff"}}>
      <h2 className="m-5 p-5">{orderItems.length > 0 ? 'Mis Productos' : ''}</h2>
      {orderItems.length > 0  && !ordered ?
        <Row>
        <Col md={8} style={{padding: "0 0 0 3rem"}}>
        {orderItems.map(item => (
          <Card key={item._id} className="mb-3 custom-card" style={{width: "80%"}}>
              <div className="d-flex card-shopping" id={item._id}>
              <div className="image-shopping">
                <Card.Img variant="top" src={item.image[0]} style={{maxWidth: "200px"}} />
                <div className="image-overlay">
                <Button variant="danger" onClick={()=> handleDeleteItem(index)}>🗑️</Button>
                </div>
              </div>
                <div>
                  <Card.Body className="d-flex flex-column justify-content-between ">
                    <div>
                      <Card.Title>{item.name} {item.color ? `- Color: ${item.color}` : ''} {item.size ? `- Talla: ${item.size}` : ''}</Card.Title>
                    </div>
                    <div className="text-right">
                      <Card.Text>$<Currency amount={item.price}/></Card.Text>
                      <Form.Group>
                        <Form.Label>Cantidad:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            className='ds-buttons'
                            onClick={() => handleQuantityChange(item._id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="text"
                            value={item.quantity}
                            onChange={e => handleQuantityChange(item._id, parseInt(e.target.value))}
                            min={1}
                            className="mx-2 input-quantity ds-buttons"
                            disabled="disabled"
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className='ds-buttons'
                          >
                            +
                          </Button>
                          <Button variant="danger" onClick={()=> handleDeleteItem(item._id)} style={{ marginLeft: "2em" }}>🗑️</Button>
                        </div>
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <Col md={4} className="justify-content-center total-shopping" style={{padding: "0 3rem 0 0"}}>
          <div className="image-bordered" style={{width: "100%", backgroundColor:"#eaeded"}}>
            <Row className="text-center">
              <h4 className="p-5">Total a Pagar: $<Currency amount={totalAmount}/></h4>
            </Row>
            <Row md={3} className="text-md-right p-4 justify-content-center" >
            <Button 
              onClick={handleShowModal}
            style={{width: "80%"}}  
            > 
              Realizar compra
            </Button>
          </Row>
          </div>
          {modalPayment && <InfoUser product={orderItems} />}
        </Col>
        </Row>
        :
        <Row md={12}>
          <div className='text-center'>
              <h2>{!ordered ? 'Tu carrito está vacío' : '¡Gracias por tu compra! :)'}</h2>
              <h4>{!ordered ? '¿Quieres ver nuestros productos?' : '¿Quieres seguir viendo nuestros productos?'}</h4>
              <a href="/" style={{textDecoration: "none"}}>
                <Button variant='info'>{!ordered ? 'Descúbrelo aquí' : 'Míralos aquí'}</Button>
              </a>
          </div>
        </Row>
      }
    </Container>
  );
};

export default OrderSection;
