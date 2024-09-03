import React, { useEffect } from "react";
import Currency from "./CurrencyFormater";
import { Link } from "react-router-dom";
import { useStoreHook } from "../hooks/Store/store";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "./Loader";
import useProductContext from "../hooks/useProductContext";

const Store = () => {
  const { 
    orderItems, discount, handleDiscount,
    handleQuantityChange, handleDeleteItem, 
    isThereProducts, errorCoupon, handlePayNow
  } = useStoreHook();

  const { userLogged } = useProductContext();

  const navigate = useNavigate();
  const totalAmount = orderItems?.reduce((total, item) => total +  item.price * item.quantity, 0);
  const shipment = 12000;

  useEffect(() => {
    if (userLogged !== undefined) {
      const timeoutId = setTimeout(() => {
        if (userLogged.length === 0) {
          navigate("/login");
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [userLogged, navigate]);

  //HAY QUE INTENTAR QUE CADA VEZ QUE CARGUE EL CARRITO SE VERIFIQUE EL USUARIO DE UNA MANERA RÁPIDA PARA QUE NO REDIRIJA HASTA EL LOGIN EN CASO DE QUE ESTÉ LOGEADO

  return (
    <section className='w-full xl:px-60 lg:px-20 py-5 bg-white' key={"productsCart"}>
      {isThereProducts ? (
        <>
        <table className="w-full bg-gray-100 max-w-[2000px]">
          <thead>
            <tr className="bg-gray-200 rounded">
              <th className="hidden xl:table-cell text-center py-4">Producto</th>
              <th className="hidden xl:table-cell text-center py-4">Precio</th>
              <th className="hidden xl:table-cell text-center py-4">Cantidad</th>
              <th className="hidden xl:table-cell text-center py-4">Total</th>
              <th className="hidden xl:table-cell py-4 w-[3%]"></th>
              <th className="xs:table-cell xl:hidden text-center py-4" colSpan={5}>Productos</th>
              <th className="xs:table-cell xl:hidden text-center py-4 xs:w-[1%]"></th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length > 0 && orderItems.map((items) => (  
              <tr className="shadow-md xs:py-5 xl:p-0 xl:mt-2" key={items.id}>
                <td className='xs:py-8 xs:px-4 xl:py-0 sm:w-[400px] xl:w-[35%] flex-1'>
                  <Link to={`/lubricante/${items.id}`} className="flex xs:flex-col gap-3">
                    <div className="w-full flex gap-3">
                       <img src={items.images[0]?.imageName} alt={items.name} className=" max-h-[90px] object-cover xs:w-[90px] xl:w-[150px] pt-1" />
                        <div className='flex flex-col xl:justify-center xl:w-[55%] xs:w-[90%]'>
                          <strong className='line-clamp-2 xs:text-xs lg:text-sm max-w-[300px]'>{items.name}</strong>
                          {items?.size && <p className="xs:text-xs lg:text-sm">Talla: {items?.size}</p>}
                          {items?.color && <p className="xs:text-xs lg:text-sm">Color: {items?.color}</p>}
                        </div>
                    </div>
                    <div className='flex flex-col xl:justify-center xl:w-[55%] xs:w-[90%]'>
                      <Currency amount={items.price} className="xs:text-[14px] xs:block xl:hidden lg:text-sm mb-auto"/> 
                    </div>
                  </Link>
                </td>
                <td className="text-center flex-1 xs:hidden xl:table-cell">
                  <Currency amount={items.price} className="xs:text-[14px] lg:text-sm mb-auto"/>
                </td>
                <td className="flex xs:flex-col items-center xl:justify-center xs:justify-between xs:pt-8 xl:h-[110px] xs:h-[7em] md:h-[7.5em] xs:pt-4 xl:pt-0 flex-1">
                  <div className="flex">
                    <button className="xs:p-0 bg-gray-400 xs:h-5 xs:w-5 lg:h-7 lg:w-7 flex justify-center items-center text-black border border-gray-500" onClick={() => handleQuantityChange(items.id, Math.max(1, items.quantity - 1))}>-</button>
                    <input type="text" className="text-center lg:pt-3 xs:text-sm xl:h-[1.8rem] lg:text-sm xs:h-5 xs:w-7 lg:h-8 lg:w-12 xs:border-0  rounded-none font-bold" value={items.quantity} readOnly/>
                    <button className="xs:p-0 bg-gray-400 xs:h-5 xs:w-5 lg:h-7 lg:w-7 flex justify-center items-center text-black  border-gray-500" onClick={() => handleQuantityChange(items.id, items.quantity + 1)}>+</button>
                  </div>
                  <Currency amount={items.price * items.quantity} className="xs:text-[12px] lg:text-sm font-bold xl:hidden"/>
                 </td>
                <td className="text-center flex-1 xs:hidden xl:table-cell">
                  <Currency amount={items.price * items.quantity} className="xs:text-[14px] lg:text-sm mb-auto font-bold"/>
                </td>
                <td className="xs:w-[1%]">
                  <button onClick={() => handleDeleteItem(items.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="xs:h-5 lg:h-5 xl:h-18" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                      <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
      <div className="flex justify-center xs:flex-col md:flex-row mt-3 gap-3">    
        <form className="bg-gray-100 py-4 d-flex flex-column justify gap-2 px-9 lg:h-60 xs:h-auto w-full" onSubmit={handleDiscount}>
          <strong className="xs:text-sm lg:text-[16px]">Cupón de Descuento</strong>
          <p className="xs:text-sm lg:text-[16px]">¿Tienes un código de descuento? Ingrésalo aquí</p>
          <input type="text" name="coupon" id="coupon" className="w-full xs:h-10 " placeholder='Escribe el código del cupón'/>
          <button type="submit"className="bg-blue-500 hover:bg-blue-400 mb-auto xs:text-sm lg:text-[16px]">Aplicar Cupón</button>
          {
            errorCoupon && !discount.discount ? ( <p className=" text-center text-red-500 xs:text-xs sm:text-sm ">{errorCoupon}</p> )
            : !errorCoupon && discount.discount > 0 ? ( <p className="text-center text-black xs:text-xs sm:text-sm ">Hemos aplicado un {discount.discount * 100}% de descuento a tu compra</p> )
            : null
          }
        </form>
        <div className="bg-gray-100 py-4 d-flex flex-column gap-2 px-9 lg:h-60 xs:h-auto w-full ">
          <strong className="xs:text-sm lg:text-[16px]">Detalles de Pago</strong>
          <div className='d-flex justify-content-between'>
            <span className="xs:text-sm lg:text-[16px]">Subtotal Carrito</span>
            <p className="xs:text-sm lg:text-[16px]"><Currency amount={isNaN(totalAmount) ? 0 : totalAmount} className="font-bold" currency={true}/></p>
          </div>
          <div className='d-flex justify-content-between'>
            <span className="xs:text-sm lg:text-[16px]">Descuento aplicado</span>
            <p className="xs:text-sm lg:text-[16px]"><span className="text-xs text-red-500 pe-2">{discount.discount * 100}%</span> <Currency amount={totalAmount * (discount.discount > 0 ? discount.discount : 0)} currency={true}/></p>
          </div>
          <div className='d-flex justify-content-between'>
            <span className="xs:text-sm lg:text-[16px]">Subtotal envío</span>
            <p className="xs:text-sm lg:text-[16px]"><Currency amount={12000} className="text-gray-500" currency={true}/></p>
          </div>
          <div className='d-flex justify-content-between'>
            <span className="xs:text-sm lg:text-[16px]">Valor total</span>
            <p className="xs:text-sm lg:text-[16px]"><Currency amount={isNaN(totalAmount + shipment) ? 0 : totalAmount - (totalAmount * (discount.discount > 0 ? discount.discount : 0)) + shipment} className="font-bold" currency={true}/></p>
          </div>
          <button className="bg-blue-500 mt-2 hover:bg-blue-400" onClick={handlePayNow}>Comprar Ahora</button>
        </div>
      </div>
      </>
       ):(
        <MainLoader/>
       )}
    </section>
  );
};

export default Store;