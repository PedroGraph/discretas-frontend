import React, {useState} from "react";
import nequi from "/image/nequi-2.svg";
import paypal from "/image/paypal-3.svg";
import useProductContext from "../hooks/useProductContext";
import { Orders } from "../hooks/Orders/Orders";
import "../css/checkout.css";

const PaymentMethod = ({userInfo, products}) =>{
   const { handleSetOrders } = Orders();
   const {setIsLoadingForm, setIsCompleteForm, userLogged} = useProductContext();
   const [selectedPayment, setSelectedPayment] = useState(null);

    const handleSelectedPayment = (payment) => {
        setSelectedPayment(payment);
    };

    const handlePayProducts = (e) => {

      e.preventDefault();
      setIsLoadingForm(true);

      const currentDate = new Date();
      const orderDate = currentDate.toISOString();

      const items = [];
      let totalPrice = 0;
      products.map(product =>{
        items.push(product);
        totalPrice+=product.price;
      })

      const order = {
        userID: userLogged,
        products: items,
        shippingAddress:{
          address: userInfo.address,
          city: userInfo.city,
          state: userInfo.state,
          fullName: userInfo.name+' '+userInfo.last_name,
        },
        orderDate: orderDate,
        totalPrice:totalPrice
      }

      handleSetOrders(order).then(response =>{
        if(response==="Added orders"){
          setIsLoadingForm(false);
          setIsCompleteForm(true);
          setTimeout(()=>{setIsCompleteForm(false);},5000)
        }
      }).catch(e =>{
        console.log(e)
      })
    }

    return (
        <>
          <div className="text-center mt-4">
            <span>MÉTODO DE PAGO</span>
            <div className="d-flex justify-content-center flex-column mt-5">
              <span className="p-3">Selecciona un método de pago</span>
              <div className="mt-3 d-flex justify-content-between px-5">
                <img
                  src={nequi}
                  style={{ width: "130px" }}
                  className={
                    selectedPayment === "Nequi" ? "payment-active" : ""
                  }
                  onClick={(e) => {
                    handleSelectedPayment("Nequi");
                  }}
                />
                <img
                  src={paypal}
                  style={{ width: "130px" }}
                  className={
                    selectedPayment === "PayPal" ? "payment-active" : ""
                  }
                  onClick={(e) => {
                    handleSelectedPayment("PayPal");
                  }}
                />
              </div>
              {selectedPayment && (
                <div className="d-flex justify-content-center">
                  <button className="w-50 mt-5 bg-success" onClick={(e) => {handlePayProducts(e)}}>Realizar compra</button>
                </div>
              )}
            </div>
          </div>
        </>
    )
}

export default PaymentMethod;