import React, { useState } from 'react';
import { Row, Col, Button, Dropdown, Spinner } from 'react-bootstrap';
import paypal from '../../../image/paypal.png';
import nequi from '../../../image/nequi.png';
import creditCard from '../../../image/credit-card.png';
import Currency from './CurrencyFormater'
import { BsWhatsapp } from 'react-icons/bs';

const Payment = ({orderItems, setOrdered}) =>{

  const [selectedPayment, setSelectedPayment] = useState('Metodo de Pago');
  const [errorSelectedPayment, setErrorSelectedPayment] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

   
    
  const phoneNumber = 573196584661;

  const totalAmount = orderItems.reduce((total, item) => total + item.total * item.quantity, 0);

  let message = [];

  for (let i = 0; i < orderItems.length; i++) {

    const color = orderItems[i].color ? `- Color: ${orderItems[i].color}` : '';
    const size = orderItems[i].size ? `- Talla: ${orderItems[i].size}` : '';

    message[i] = `
*${orderItems[i].name} ${color} ${size}* // Cantidad *${orderItems[i].quantity}*
    `
  }

  const currency = {
    style: 'currency',
    currency: 'COP'
  }

  const formatCurrency = new Intl.NumberFormat('es-ES', currency);

  

  const encodedMessage = encodeURIComponent(`
¡Nuevo pedido!
${message}

Método de pago: *${selectedPayment}*
-----------------------------------------
Total a pagar: $${formatCurrency.format(totalAmount)}
-----------------------------------------
  `)


    const paymentOptions = [
        { name: 'PayPal', imageUrl: paypal },
        { name: 'Transferencia Bancaria', imageUrl: creditCard },
        { name: 'Nequi', imageUrl: nequi },
    ];

    const handlePaymentChange = payment => {
        setErrorSelectedPayment(false);
        setSelectedPayment(payment);
    };;

    const hnadlePayment = () => {

        if(selectedPayment === 'Metodo de Pago') {
            setErrorSelectedPayment(true);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsComplete(true);
            setTimeout(() => {
               window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
                setOrdered(true);
                localStorage.clear();
            }, 1000);
        }, 1000);
    };



    return(
    <Col md={4} className="justify-content-center" style={{padding: "0 3rem 0 0"}}>
        <div className="image-bordered" style={{width: "100%", backgroundColor:"#eaeded"}}>
          <Row className="text-center">
            <h4 className="p-5">Total a Pagar: $<Currency amount={totalAmount}/></h4>
          </Row>
          <Row md={3} className="text-md-right p-4 justify-content-center" >
            <Button 
            variant={isComplete ? 'success' : 'primary'} 
            style={{width: "80%"}}  
            disabled={errorSelectedPayment} 
            onClick={hnadlePayment}
            > {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : isComplete ? (
                '✅'
              ) : (
                <span>
                   Comprar por Whatsapp <BsWhatsapp/>
                </span>
              )}
            </Button>
          </Row>
          <div className="dropdown-items justify-content-center">
            <Dropdown className="p-5" style={{width: "100%"}}>
            <Dropdown.Toggle variant="secondary">{selectedPayment}</Dropdown.Toggle>
              <Dropdown.Menu>
                {paymentOptions.map(payment => (
                  <Dropdown.Item
                    key={payment.name}
                    onClick={() => handlePaymentChange(payment.name)}
                  >
                  <img src={payment.imageUrl} className="mr-2" />
                  { " "+payment.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              {errorSelectedPayment && <div className='text-center' style={{color: "red"}}>Seleccione un método de pago</div>}
            </Dropdown>
          </div>
          <div>
          <p style={{marginLeft: "3rem", marginRight: "3rem"}}>
            <span style={{fontWeight: "bold"}} className='text-center'>Aviso: </span>
             Nuestra página no está usando pasarela de pago. Cuando realizas una compra tu pedido
             se enviará a nuestra plataforma de pedidos para contartarte lo más rápido posible.
          </p>
          </div>
        </div>
    </Col>
    );
}

export default Payment;