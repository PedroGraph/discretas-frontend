import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import Currency from './CurrencyFormater'
import Payment from './Payment'
import InfoUser from './FormModal'
import shoppingCart from '../../../image/shopping.svg'
import '../css/style_products.css'
import '../css/store.css'

const OrderSection = () => {

  const { modalPayment, setModalPayment, setOrderList, orderList } = useProductContext()
  const shopping = JSON.parse(localStorage.getItem('store')) || [];
  const [orderItems, setOrderItems] = useState(shopping);
  const [ordered, setOrdered] = useState(false);
  const [payButton, setPayButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    if(modalPayment) setLoading(true);
    else setLoading(false);
  },[modalPayment]);
  
  const handleQuantityChange = (id, newQuantity) => {
    console.log(id, newQuantity)
    setOrderItems(prevItems =>
      prevItems.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleShowModal = () => {
    setLoading(true);
    setModalPayment(true);
  };

  const handleDeleteItem = (id) => {
    setOrderItems(prevItems =>{
      const newArray = [...prevItems]; 
      newArray.splice(id, 1); 
      localStorage.setItem('store', JSON.stringify(newArray));
      return newArray; 
    });

    setOrderList(prevItems =>{
      const newArray = [...prevItems]; 
      newArray.splice(id, 1); 
      return newArray; 
    });
  };

  const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  return (
    <Container className="" style={{minHeight: "800px", borderRadius: "2%", backgroundColor: "#FFFFFF"}}>
      <h2 className="text-shopping p-5">{orderItems.length > 0 ? 'Mis Productos' : ''}</h2>
      {orderItems.length > 0  && !ordered ?
        <Row>
        <Col md={8} style={{padding: "0 0 0 3rem"}}>
        {orderItems.map(item => (
          <Card key={item._id} className="mb-3 custom-card" style={{width: "80%"}}>
              <div className="d-flex card-shopping" id={item._id}>
              <div className="image-shopping">
                <Card.Img variant="top" src={item.image[0]} style={{maxWidth: "200px"}} />
                <div className="image-overlay">
                <Button variant="danger" onClick={()=> handleDeleteItem(item._id)}>🗑️</Button>
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
        <div className='total-shopping-mobile'>
          <div className='shopping-icon-mobile' id="shopping-svg" onClick={(e) => {setPayButton(!payButton)}}>
            <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8.5,19 C9.32842712,19 10,19.6715729 10,20.5 C10,21.3284271 9.32842712,22 8.5,22 C7.67157288,22 7,21.3284271 7,20.5 C7,19.6715729 7.67157288,19 8.5,19 Z M17.5,19 C18.3284271,19 19,19.6715729 19,20.5 C19,21.3284271 18.3284271,22 17.5,22 C16.6715729,22 16,21.3284271 16,20.5 C16,19.6715729 16.6715729,19 17.5,19 Z M3,2 L5,2 C5.45560407,2 5.848307,2.30684025 5.96505661,2.73773928 L5.9883717,2.84794282 L6.47330357,6 L21,6 C21.5997637,6 22.0549227,6.52067883 21.9951229,7.10034708 L21.9761871,7.21693046 L20.324218,14.6507914 C20.0324549,15.9637252 18.9058923,16.91433 17.5779312,16.9945094 L17.3956568,17 L8.71583791,17 C7.2943532,17 6.07697015,16.0043648 5.78265284,14.6299072 L5.75072282,14.4561716 L4.14208104,4 L3,4 C2.44771525,4 2,3.55228475 2,3 C2,2.48716416 2.38604019,2.06449284 2.88337887,2.00672773 L3,2 L5,2 L3,2 Z M19.7533839,8 L6.78099588,8 L7.72746622,14.1520572 C7.79674409,14.6023634 8.15972961,14.9438425 8.60337063,14.9937133 L8.71583791,15 L17.3956568,15 C17.8252972,15 18.2020966,14.7264627 18.3402285,14.3284527 L18.3718438,14.2169305 L19.7533839,8 Z"/>
            </svg>
          </div>
          <div className={payButton ? 'shopping-button-mobile' : 'd-none'}>
            <button className="btn-success " onClick={handleShowModal}>
            {!loading ? 'Comprar' : <Spinner animation="border" size="sm" />}
            </button>
          </div>
          <div>
          {orderList.length > 0 && <span class="">{orderList.length}</span>}
          </div>
        </div>
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
