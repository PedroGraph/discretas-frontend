import React from "react";
import '../../css/orders.css';
import { Orders } from "../../hooks/Orders/Orders";
import { Link, useNavigate } from "react-router-dom";

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
    <section className="d-flex flex-column w-full xs:p-5 xl:p-0 pt-0 orders-section-container">
      <div className="w-100 flex items-center ps-3 bg-gray-200 pt-4 pb-2 pe-2">
        <span className="text-sm me-2">Tienes {orders.length} pedidos creados durante: </span>
        <select className="w-[100px] text-xs rounded h-6" name="" id="">
          <option className="text-black text-xs" value="">2024</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 pt-4 px-72 bg-gray-100 items-center">
        <div className="grid grid-cols-3 w-3/4">
          <span className="text-sm font-bold text-center border-b-2 border-gray-300">Pedidos Creados</span>
          <span className="text-sm font-bold text-center border-b-2 border-gray-300">Pedidos Recibidos</span>
          <span className="text-sm font-bold text-center border-b-2 border-gray-300">Pedidos Cancelados</span>
        </div>
        {orders.length > 0 && (
           orders.map((order, index) => {
            const totalPrice = order.products.reduce((acc, product) => acc + product.price, 0);
            return(
            <div className="border-1 border-gray-300 rounded" key={index}>
              <div className="grid grid-cols-3 bg-gray-200 gap-2 py-3 px-4">
                <span>Total: <span className="font-semibold text-sm">${CurrencyFormatter(totalPrice)}<span className="text-xs font-light">COP</span></span></span>
                <span>Fecha de compra: <span className="font-semibold text-sm">{dateFormatter(order.createdAt)}</span></span>     
                <span>Número de Pedido: <span className="font-semibold text-sm">{order.orderId}</span></span>
                <span>Enviado a: <span className="font-semibold text-sm">{order.shippingAddress.address} { order.shippingAddress.city}</span></span>
              </div>
              <div className="grid grid-cols-1 ">
              {
                order.products.length > 0 && order.products.map((product, index) => {
                  return(
                    <div className="flex gap-4 py-2 border-1 border-gray-200 px-4 py-2" key={index}>
                      <Link className="max-w-[190px]" onClick={() => {window.location.href = `/lubricante/${product.id}`}}>
                       <img src={product.images[0].imageName} alt="" className="rounded"/>
                      </Link>
                      <div className="flex flex-col max-w-[60%]">
                      <Link onClick={() => {window.location.href = `/lubricante/${product.id}`}}>
                        <span className="font-semibold text-sm">{product.name}</span>
                      </Link>
                      <span className="pt-1">
                        ${CurrencyFormatter(product.price)}<span className="text-xs">COP</span> 
                        {product.discount > 0 && (
                          <span className="ps-2 text-sm">{product?.discount * 100}% de descuento</span>
                        )}
                        <div className="flex w-full gap-2 pt-1">
                          <span className={`h-5 w-5 rounded bg-red-500`}/>
                          <span className="h-5 w-5 rounded bg-black text-xs text-white d-flex justify-center items-center">{product.characteristics[0].size[3]}</span>
                        </div>
                      </span>
                      </div>
                      <div className="flex flex-col ml-auto gap-2">
                        <button className="bg-gray-900 p-1 rounded text-sm">Rastrear Pedido</button>
                        <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Ver Detalles</button>
                        <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Devolver producto</button>
                        <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Ayuda</button>
                      </div>
                    </div>
                  )
              })}
              </div>
            </div>
           )})
        )}
      </div>
    </section>
  )
}

export default OrdersSection