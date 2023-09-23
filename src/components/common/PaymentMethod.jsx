import React, {useState} from "react";
import nequi from "/image/nequi-2.svg";
import paypal from "/image/paypal-3.svg";
import useProductContext from "../hooks/useProductContext";
import "../css/checkout.css";

const PaymentMethod = () =>{

   const {setIsLoadingForm, setIsCompleteForm} = useProductContext();
   const [selectedPayment, setSelectedPayment] = useState(null);

    const handleSelectedPayment = (payment) => {
        setSelectedPayment(payment);
    };

    const handlePayProducts = (e) => {
      e.preventDefault();
      setIsLoadingForm(true)
      setTimeout(() => {
        setIsLoadingForm(false);
        setIsCompleteForm(true);
      }, 3000);
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