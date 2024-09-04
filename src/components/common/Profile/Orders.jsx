import React from "react";
import '../../css/orders.css';
import { Orders } from "../../hooks/Orders/Orders";
import { Link, useNavigate } from "react-router-dom";

const OrdersSection = () => {

  const { orders, selectedSection } = Orders();
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


  return (
    <section className="d-flex flex-column w-full xs:p-0 xl:p-0 pt-0">
      <div className="w-100 flex items-center ps-3 bg-gray-200 pt-4 pb-2 lg:pe-2">
        <span className="text-sm me-2">Tienes {orders.length} pedidos creados durante: </span>
        <select className="w-[100px] text-xs rounded h-6" name="" id="">
          <option className="text-black text-xs" value="">2024</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 pt-4 xs:px-2 lg:px-40 xl:px-72  bg-gray-100 items-center">
        <div className="grid grid-cols-3 lg:w-3/4 xs:w-full">
          <a href="/orders" className={`border-b-2 text-center ${selectedSection.includes("orders") ? "border-black" : "border-gray-300"} cursor-pointer no-underline`}>
            <span className={`text-sm font-bold text-center xs:text-xs lg:text-sm`}>Pedidos Creados</span>
          </a>
          <a href="/orders/recieved" className={`border-b-2 text-center ${selectedSection.includes("/recieved") ? "border-black" : "border-gray-300"} cursor-pointer no-underline`}>
            <span className={`text-sm font-bold text-center xs:text-xs lg:text-sm`}>Pedidos Recibidos</span>
          </a>
          <a href="/orders/canceled" className={`border-b-2 text-center ${selectedSection.includes("/canceled") ? "border-black" : "border-gray-300"} cursor-pointer no-underline`}>
            <span className={`text-sm font-bold text-center xs:text-xs lg:text-sm`}>Pedidos Cancelados</span>
          </a>
        </div>
        {orders.length > 0 && (
          orders.map((order, index) => {
            const totalPrice = Array.isArray(order.products) ? order.products.reduce((acc, product) => acc + product.price, 0) : order.products.price;
            return (
              <div className="border-1 border-gray-300 rounded w-full" key={index}>
                <div className="grid xs:grid-cols-2 lg:grid-cols-3 xs:bg-gray-400 lg:bg-gray-200 gap-2 lg:py-3 lg:px-4 xs:p-2">
                  <span className="xs:text-xs lg:text-sm">Total: <span className="font-semibold xs:text-xs lg:text-sm">${CurrencyFormatter(totalPrice)}<span className="text-xs font-light">COP</span></span></span>
                  <span className="xs:text-xs lg:text-sm">Fecha de compra: <span className="font-semibold xs:text-xs lg:text-sm">{dateFormatter(order.createdAt)}</span></span>
                  <span className="flex xs:flex-col lg:flex-row justify-start xs:text-xs lg:text-sm gap-1">Número de Pedido: <span className="font-semibold xs:text-xs lg:text-sm">{order.orderId}</span></span>
                  <span className="flex xs:flex-col lg:flex-row justify-start lg:col-span-3 xs:text-xs lg:text-sm gap-1">Enviado a: <span className="font-semibold xs:text-xs lg:text-sm">{order.shippingAddress.address} {order.shippingAddress.city}</span></span>
                </div>
                <div className="grid grid-cols-1 ">
                  {
                    Array.isArray(order.products) && order.products.length > 0 && order.products.map((product, index) => {
                      return (
                        <div className="flex xs:flex-col lg:flex-row gap-4 py-2 border-1 border-gray-200 xs:px-2 lg:px-4 py-2" key={index}>
                          <div className="flex lg:gap-4 xs:gap-2 lg:w-4/6">
                            <Link className="max-w-[190px]" onClick={() => { window.location.href = `/lubricante/${product.id}` }}>
                              <img src={product.images[0].imageName} alt="" className="rounded lg:h-auto xs:h-[80px] xs:w-[120px] lg:w-full object-cover" />
                            </Link>
                            <div className="flex flex-col xs:max-w-[60%] sm:max-w-[90%]">
                              <Link onClick={() => { window.location.href = `/lubricante/${product.id}` }}>
                                <span className="xs:font-normal lg:font-semibold text-sm">{product.name}</span>
                              </Link>
                              <span className="pt-1 xs:text-[14px] xs:font-bold lg:text-sm ">${CurrencyFormatter(product.price)}<span className="text-xs">COP</span>
                                {product.discount > 0 && (
                                  <span className="ps-2 text-sm">{product?.discount * 100}% de descuento</span>
                                )}
                                <div className="flex w-full gap-2 pt-1">
                                  <span className={`h-5 w-5 rounded bg-red-500`} />
                                  <span className="h-5 w-5 rounded bg-black text-xs text-white d-flex justify-center items-center">{product.characteristics[0].size[3]}</span>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="lg:flex lg:flex-col xs:grid xs:grid-cols-2 sm:grid-cols-4 lg:ml-auto gap-2">
                            <button className="bg-gray-900 p-1 rounded text-sm xs:order-4 lg:order-1">Rastrear Pedido</button>
                            <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Ver Detalles</button>
                            <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Devolver producto</button>
                            <button className="border-1 border-gray-500 p-1 rounded text-black text-sm xs:order-1 lg:order-4">Ayuda</button>
                          </div>
                        </div>
                      )
                    })}
                  {
                    !Array.isArray(order.products) && order.products && (
                      <div className="flex xs:flex-col lg:flex-row gap-4 py-2 border-1 border-gray-200 xs:px-2 lg:px-4 py-2" >
                        <div className="flex lg:gap-4 xs:gap-2 lg:w-4/6">
                        <Link className="max-w-[190px]" onClick={() => { window.location.href = `/lubricante/${order.products.id}` }}>
                          <img src={order.products.images[0].imageName} alt="" className="rounded lg:h-auto xs:h-[80px] xs:w-[120px] lg:w-full object-cover" />
                        </Link>
                        <div className="flex flex-col max-w-[60%]">
                          <Link onClick={() => { window.location.href = `/lubricante/${product.id}` }}>
                            <span className="lg:font-semibold xs:font-normal text-sm">{order.products.name}</span>
                          </Link>
                          <span className="pt-1 xs:text-[14px] xs:font-bold lg:text-sm ">
                            ${CurrencyFormatter(order.products.price)}<span className="text-xs">COP</span>
                            {order.products.discount > 0 && (
                              <span className="ps-2 text-sm">{order.products?.discount * 100}% de descuento</span>
                            )}
                            <div className="flex w-full gap-2 pt-1">
                              <span className={`h-5 w-5 rounded bg-${order.products.characteristics[0].color.toLowerCase()}-400`} />
                              <span className="h-5 w-5 rounded bg-black text-xs text-white d-flex justify-center items-center">{order.products.characteristics[0].size[0]}</span>
                            </div>
                          </span>
                        </div>
                        </div>
                        <div className="lg:flex lg:flex-col xs:grid xs:grid-cols-2 sm:grid-cols-4 lg:ml-auto gap-2">
                          <button className="bg-gray-900 p-1 rounded text-sm">Rastrear Pedido</button>
                          <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Ver Detalles</button>
                          <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Devolver producto</button>
                          <button className="border-1 border-gray-500 p-1 rounded text-black text-sm">Ayuda</button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

export default OrdersSection