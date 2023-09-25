import React from "react";
import '../../css/orders.css';
import { Orders } from "../../hooks/Orders/Orders";
import { useNavigate } from "react-router-dom";

const OrdersSection = () => {

  const {orders} = Orders();
  const dateFormatter = (date) => new Date(date).toLocaleDateString();
  const navigate = useNavigate();
  const CurrencyFormatter = (amount) => {
    const formattedAmount = amount.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'COP', 
      maximumFractionDigits: 0, 
    });
  
    return formattedAmount.replace("COP", "");
  }

    return(
      <div className="d-flex justify-content-center flex-column w-50 p-5 pt-0">
        {orders.length > 0 && (
          orders.map((order, index) =>(
            <div key={index} className="order-items">
              <div className="d-flex p-4 justify-content-between">
                <div className="d-flex flex-column">
                    <span>Fecha del pedido: {dateFormatter(order.orderDate)}</span>
                    <span>Valor total: ${CurrencyFormatter(order.totalPrice)}</span>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <span>Enviado a: {order.shippingAddress.fullName}</span>
                    <span>Número del Pedido: {order._id}</span>
                </div>
              </div>
              {
                order.products.map((product, index) => (
                <div key={`products-${index}`} className="d-flex p-4 order-products">
                  <div>
                      <img src={product.image[0]}/>
                  </div>
                  <div key={`button-${index}`} className="d-flex flex-column w-100">
                      <h5>{product.name}</h5>
                      {product.size && (
                      <div className="d-flex  align-items-center">
                        <span>Talla: </span>
                        <div className="order-characteristics">{product.size}</div>
                      </div>
                      )}
                      {product.color && (
                      <div className="d-flex align-items-center">
                        <span>Color: </span>
                        <div className="order-characteristics" style={{backgroundColor: product.color}}></div>
                      </div>
                      )}
                  </div>
                  <div className="d-flex justify-content-end align-items-end w-50">
                    <button className="bg-black" onClick={() => {navigate(`/lubricantes/${product._id}`)}}>Comprar nuevamente</button>
                  </div>
                </div>
                ))
              }
              
            </div>
          ))
        )}
      </div>
    )
}

export default OrdersSection