import React from 'react';
import { Row, Button, Dropdown, Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import paypal from '../../../image/paypal.png';
import nequi from '../../../image/nequi.png';
import creditCard from '../../../image/credit-card.png';
import Currency from './CurrencyFormater'
import { BsWhatsapp } from 'react-icons/bs';

const Payment = ({orderItems}) =>{

  const {
    isLoadingForm, 
    isCompleteForm, setIsCompleteForm, 
    errorSelectedPayment, setErrorSelectedPayment,
    formData, canSubmit,
    selectedPayment, setSelectedPayment,
    handlePayment,
  } = useProductContext();

  
  const phoneNumber = 573196584661;
  const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  let message = [];
  const currency = { style: 'currency', currency: 'COP' }
  const formatCurrency = new Intl.NumberFormat('es-ES', currency);

  for (let i = 0; i < orderItems.length; i++) {

    const color = orderItems[i].color ? `- Color: ${orderItems[i].color}` : '';
    const size = orderItems[i].size ? `- Talla: ${orderItems[i].size}` : '';

    message[i] = `
*${orderItems[i].name} ${color} ${size}* // Cantidad *${orderItems[i].quantity}*
    `
  }

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

    return(
    <></>
    );
}

export default Payment;