import React, {useState} from "react";
import nequi from "/image/nequi-2.svg";
import paypal from "/image/paypal-3.svg";
import useProductContext from "../hooks/useProductContext";
import { Orders } from "../hooks/Orders/Orders";
import { GetUserInfo } from "../services/Auth";
import "../css/checkout.css";

const PaymentMethod = ({userInfo, products}) =>{
   const { handleSetOrders } = Orders();
   const { setIsLoadingForm, setIsCompleteForm } = useProductContext();
   const [selectedPayment, setSelectedPayment] = useState(null);

    const handleSelectedPayment = (payment) => {
        setSelectedPayment(payment);
    };

    const handlePayProducts = async (e) => {
      setIsLoadingForm(true);
      e.preventDefault();
      const items = [];
      let totalPrice = 0;

      products.map(product =>{
        items.push(product);
        totalPrice += product.price;
      })
      console.log(userInfo)
      const order = {
        userId: userInfo.id,
        products: items,
        shippingAddress: {
          address: `${userInfo?.address} ${userInfo?.city} ${userInfo?.state}`,
          city: userInfo.city,
          fullName: userInfo.firstName+' '+userInfo.lastName,
        },
      }

      console.log(order)

      // handleSetOrders(order).then(response =>{
      //   if(response.info.orderId){
      //     setIsCompleteForm(true);
      //   }
 
      // }).catch(e =>{
      //   console.log(e);
      // }).finally(() =>{
      //   setIsLoadingForm(false);
      // })
      setIsLoadingForm(false)
    }

    return (
        <>
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center flex-column">
              <div className=" d-flex justify-between w-full gap-4">
                <select onChange={handleSelectedPayment} name="paymentOptions" id="paymentOptions" className="w-2/4 h-9 rounded ps-2">
                  <option value="" className='text-black w-50' hidden selected>Selecciona un método de pago</option>
                  <option value="PayPal" className='text-black w-50'>AV Villas</option>
                  <option value="Bancolombia" className='text-black w-50'>Bancolombia</option>
                  <option value="Banagrario" className='text-black w-50'>Banagrario</option>
                  <option value="Banco de Bogotá" className='text-black w-50'>Banco de Bogotá</option>
                  <option value="Banco de Occidente" className='text-black w-50'>Banco de Occidente</option>
                  <option value="Banco Caja Social" className='text-black w-50'>Banco Caja Social</option>
                  <option value="Banco Popular" className='text-black w-50'>Banco Popular</option>
                  <option value="BBVA" className='text-black w-50'>BBVA</option>
                  <option value="Scotiabank" className='text-black w-50'>Scotiabank</option>
                  <option value="Davivienda" className='text-black w-50'>Davivienda</option>
                  <option value="Daviplata" className='text-black w-50'>Daviplata</option>
                  <option value="Nequi" className='text-black w-50'>Nequi</option>
                </select>
                {/* <img
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
                /> */}
              {selectedPayment && (
                <div className="d-flex justify-start w-2/4">
                  <button className="rounded bg-black flex items-center h-9" onClick={(e) => {handlePayProducts(e)}}>Realizar compra</button>
                </div>
              )}
              </div>
            </div>
          </div>
        </>
    )
}

export default PaymentMethod;