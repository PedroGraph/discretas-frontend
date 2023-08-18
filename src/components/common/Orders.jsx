import React, { useState } from 'react';
import { Container, Card, Form, Row, Col, Button, Dropdown  } from 'react-bootstrap';
import '../css/style_products.css';
import Currency from './CurrencyFormater'
import Payment from './Payment'
import '../css/style_products.css'

const OrderSection = () => {

  const shopping = JSON.parse(localStorage.getItem('store')) || [];

  const [orderItems, setOrderItems] = useState(shopping);

  const [ordered, setOrdered] = useState(false);


  const handleQuantityChange = (id, newQuantity) => {
    setOrderItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setOrderItems(prevItems =>{
      const newArray = [...prevItems]; // Crear una copia del array existente
      newArray.splice(id, 1); 
      return newArray; 
    });
  };
  


  return (
    <Container className="mt-4 mb-5" style={{minHeight: "800px", borderRadius: "2%", backgroundColor: "#ffffff"}}>
      <h2 className="m-5 p-5">{orderItems.length > 0 ? 'Mis Productos' : ''}</h2>
      {orderItems.length > 0  && !ordered ?
        <Row>
        <Col md={8} style={{padding: "0 0 0 3rem"}}>
          {orderItems.map((item, index) => (
            <Card key={item.id} className="mb-3 custom-card" style={{width: "80%"}}>
              <div className="d-flex">
              <div className="image-container">
                <Card.Img variant="top" src={item.imageUrl} style={{maxWidth: "200px"}} />
                <div className="image-overlay">
                <Button variant="danger" onClick={()=> handleDeleteItem(index)}>🗑️</Button>
                </div>
              </div>
                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{item.name} {item.color ? `- Color: ${item.color}` : ''} {item.size ? `- Talla: ${item.size}` : ''}</Card.Title>
                    </div>
                    <div className="text-right">
                      <Card.Text>$<Currency amount={item.total}/></Card.Text>
                      <Form.Group>
                        <Form.Label>Cantidad:</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min={1}
                            className="mx-2 input-quantity"
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button variant="danger" onClick={()=> handleDeleteItem(index)} style={{ marginLeft: "2em" }}>🗑️</Button>
                        </div>
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        <Payment orderItems={orderItems} setOrdered={setOrdered}/>
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
