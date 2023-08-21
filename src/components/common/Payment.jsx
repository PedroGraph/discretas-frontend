import React, { useState } from 'react';
import { Row, Col, Button, Dropdown, Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import paypal from '../../../image/paypal.png';
import nequi from '../../../image/nequi.png';
import creditCard from '../../../image/credit-card.png';
import Currency from './CurrencyFormater'
import { BsWhatsapp } from 'react-icons/bs';

const Payment = ({orderItems}) =>{

  const {
    isLoadingForm, setIsLoadingForm, 
    isCompleteForm, setIsCompleteForm, 
    errorSelectedPayment, setErrorSelectedPayment,
    formData, canSubmit
  } = useProductContext();

  const [selectedPayment, setSelectedPayment] = useState('Metodo de Pago');

  console.log(orderItems)
    
  const phoneNumber = 573196584661;

  const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

Información del comprador:

Nombre(s): ${formData.nombre}
Apellido(s): ${formData.apellido}
Teléfono: ${formData.telefono}
Cedula: ${formData.cedula}
Correo: ${formData.correo}
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

        setIsLoadingForm(true);
        setTimeout(() => {
            setIsLoadingForm(false);
            setIsCompleteForm(true);
            setTimeout(() => {
               window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
                localStorage.clear();
            }, 1000);
        }, 1000);
    };

    return(
    
        <div className="image-bordered" style={{width: "100%", backgroundColor:"#eaeded"}}>
          <Row className="text-center">
            <h4 className="p-5 total-amount">Total a Pagar: $<Currency amount={totalAmount}/></h4>
          </Row>
          <Row md={3} className="text-md-right p-4 justify-content-center" >
            <Button 
            variant={isCompleteForm ? 'success' : 'primary'} 
            style={{width: "80%"}}  
            disabled={errorSelectedPayment || !canSubmit} 
            onClick={hnadlePayment}
            > {isLoadingForm ? (
                <Spinner animation="border" size="sm" />
              ) : isCompleteForm ? (
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
             se enviará a nuestra plataforma de pedidos para contactarte lo más rápido posible.
          </p>
          </div>
        </div>
    );
}

export default Payment;