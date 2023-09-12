import React, {useEffect, useState} from "react";
import useProductContext from "../hooks/useProductContext";
import Currency from "./CurrencyFormater";
import nequi from '/image/nequi-2.svg'
import paypal from '/image/paypal-3.svg'
import '../css/checkout.css'

const Checkout = () => {
    
    const { formData, setFormData, userInfo } = useProductContext();
    const shopping = JSON.parse(localStorage.getItem('store')) || [];
    const [orderItems, setOrderItems] = useState(shopping);
    const [selectedPayment, setSelectedPayment] = useState(null)

    const payments = [
        nequi,
        paypal,
    ];

    useEffect(() => {
        userInfo().then((response) => {
        response.idt = '';
        setFormData(response)
        })
    },[formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSelectedPayment = (payment) => {
        setSelectedPayment(payment);
    };

    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return(
        <>
        <div className="checkout-section p-5 d-flex justify-content-center ">
            <div key={1} className="text-center">
                <label> FINALIZA TU COMPRA </label>
                <form>
                    <input type="text" name="name" placeholder="Escribe tu nombre" value={formData.name} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="last_name" placeholder="Escribe tu Apellido" value={formData.last_name} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="phone" placeholder="Escribe tu teléfono" value={formData.phone} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="email" placeholder="Escribe tu email" value={formData.email} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="idt" placeholder="Escribe tu Cédula" value={formData.idt} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="address" placeholder="Dirección" value={formData.address} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="neibor" placeholder="Barrio" value={formData.neibor} onChange={(e) => {handleChange(e)}}/>
                    <input type="text" name="city" placeholder="Ciudad" value={formData.city} onChange={(e) => {handleChange(e)}}/>
                </form>
            </div>
            <div key={2} className="shopping d-flex flex-column">
                <div className="bg-white text-center mt-4">
                    <span>MÉTODO DE PAGO</span>
                    <div className="d-flex justify-content-center flex-column mt-5">
                        <span className="p-3">Selecciona un método de pago</span>
                        <div className="mt-3 d-flex justify-content-between px-5">
                            <img src={nequi} style={{width: "130px"}} className={selectedPayment === 'Nequi' ? 'payment-active' : ''} onClick={(e) =>{handleSelectedPayment('Nequi')}}/>
                            <img src={paypal} style={{width: "130px"}} className={selectedPayment === 'PayPal' ? 'payment-active' : ''} onClick={(e) =>{handleSelectedPayment('PayPal')}}/>
                        </div>
                        {selectedPayment && (
                            <div className="d-flex justify-content-center">
                                <button className="w-50 mt-5 bg-success ">Pagar</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Checkout;