import React, { useState, useEffect } from "react";
import useProductContext from "../hooks/useProductContext";
import colombia from "../../../colombia.json";
import Currency from "./CurrencyFormater";
import PaymentMethod from "./PaymentMethod";
import { SuccessLoader } from './Loader';
import {SettingOrder} from '../services/Orders'
import '../css/payform.css';
import { GetUserInfo } from "../services/Auth"
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Payform = ({ product }) => {
  const { characteristics } = product;
  const [formData, setFormData] = useState({})
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedForm, setCompletedForm] = useState(false);
  const { userLogged, setModalPayment } = useProductContext();

  const bgColors = {
    Red : "bg-red-400",
    Green: "bg-green-400",
    Blue: "bg-blue-400",
    RedSelected: "bg-red-600",
    GreenSelected: "bg-green-600",
    BlueSelected: "bg-blue-600"
  }

  useEffect(() =>{
    if(!userLogged) return
    GetUserInfo(userLogged).then((response) => 
      setFormData({...response, selectedColor: characteristics[0].color, selectedSize: characteristics[0].size[0], quantity: 1})
    )
  },[])

  const handleUserInfo = (e) => {
    e.preventDefault()
    console.log(e.target.name, e.target.value)
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectedCharacteristicsByUser = ({e, name, value}) => {
    e.preventDefault()
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const createNewOrder = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const items = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: formData.quantity,
        images: product.images,
        category: product.category,
        published: product.published,
        description: product.description,
        characteristics: [{ 
          color: formData.selectedColor,
          size: [formData.selectedSize]
        }]
      }
   
    const order = {
      userId: formData.id,
      products: items,
      shippingAddress: {
        address: `${formData?.address} ${formData?.city} ${formData?.state} - ${formData?.userIndications}`,
        city: formData.city,
        fullName: formData.firstName+' '+formData.lastName,
      },
      paymentOption: formData.paymentOption
    }

    SettingOrder(order).then(response =>{
      if(response.info.orderId) setCompletedForm(true);
    }).catch(e =>{
      console.log(e);
    }).finally(() =>{
      setIsLoading(false)
    })
  }

  return (
    <>
      <form onSubmit={(e) => { }} className="flex xs:flex-col lg:flex-row xs:justify-end xs:items-center lg:justify-center lg:items-center max-w-[2000px] relative z-[3000] xs:h-screen ">
        <span className="lg:block xs:hidden absolute z-[4000] top-[20.5%] right-1 px-2.5 py-0.5 cursor-pointer font-bold rounded-full bg-black text-white flex justify-center items-center" onClick={() => setModalPayment(false)}>X</span>
        <div className="relative flex justify-center items-center xs:w-full xs:max-w-[500px] lg:w-1/2 ">
          <span className="xs:block lg:hidden absolute font-bold text-white top-3 right-5 px-2.5 py-0.5 cursor-pointer rounded-full bg-black" onClick={() => setModalPayment(false)}>X</span>
          <img src={product.images[0].imageName} alt={product.name} className="lg:blur-[2px] xs:rounded-none lg:rounded-l-xl xs:h-[300px] xs:w-full lg:h-[500px]"/>
          <img src={product.images[0].imageName} alt={product.name} className="lg:block xs:hidden absolute w-5/6"/>
        </div>
        {page === 0 && (
           <div className="flex flex-col bg-gray-300 xs:w-full xs:max-w-[500px] lg:w-1/2 xs:h-auto lg:h-[500px] px-4 gap-2 xs:rounded-none lg:rounded-r-xl">
           <h2 className="text-center w-full col-span-2 py-4 xl:text-lg xs:text-sm font-bold">Finaliza tu compra. Llena el formulario :)</h2>
           <div className="flex gap-2">
             <input type="text" name="firstName" id="FirstName" className="lg:w-1/2 xs:w-full rounded h-10" placeholder="Peter" defaultValue={formData.firstName} onChange={handleUserInfo}/>
             <input type="text" name="lastName" id="LastName" className="lg:w-1/2 xs:w-full rounded h-10" placeholder="Garcia" defaultValue={formData.lastName} onChange={handleUserInfo}/>
           </div>
           <input type="email" name="email" id="Email" className="rounded h-10 col-span-2" placeholder="petergarcia@gmail.com" defaultValue={formData.email} onChange={handleUserInfo}/>
           <input type="text" name="address" id="Address" className="rounded h-10 col-span-2" placeholder="Carrera 52 #34A-43" defaultValue={formData.address} onChange={handleUserInfo}/>
           <select name="state" id="State" className={`h-9 rounded px-2 ${!formData?.state ? 'text-gray-400' : 'text-black'}`} onChange={handleUserInfo}>
             <option value="" hidden selected>Departamento</option>
             {colombia.map((state) => (
               <option key={state.id} value={state.departamento} selected={state.departamento === formData?.city ? 'selected' : ''}>
                 {state.departamento}
               </option>
             ))}
           </select>
           <select name="city" id="City" className={`h-9 rounded px-2 ${!formData?.state ? 'text-gray-400' : 'text-black'}`} onChange={handleUserInfo}>
             <option value="" hidden selected>Ciudad</option>
             {colombia.map((state, stateIndex) => {
               if (state.departamento === formData?.state) {
                 return state.ciudades.map((city, cityIndex) => (
                   <option
                     key={`${stateIndex}-${cityIndex}`}
                     value={city}
                     selected={formData.state && city === formData.city ? 'selected' : ''}
                   >
                     {city}
                   </option>
                 ));
               }
             })}
           </select>
           <textarea name="userIndications" id="UserIndications" className="col-span-2 rounded h-24" placeholder="Punto de referencia" onChange={handleUserInfo}/>
           <button className="ml-auto mt-auto py-4 px-0" onClick={() => setPage(1)}>
             <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
               <g>
                 <polygon style={{fill: '#000000'}} points="512,256 0,0 167.724,256 0,512 	" />
               </g>
             </svg>
           </button>
         </div>
        )}
        {page === 1 && (
          <div className={`flex flex-col bg-gray-300 px-4 py-4 lg:w-1/2 xs:w-full xs:h-auto lg:h-[500px] gap-3 lg:rounded-r-xl ${completedForm || isLoading ? 'flex items-center justify-center' : ''}`}>
            {isLoading && !completedForm && <Spinner className="h-20 w-20"/> }
            {!isLoading && completedForm && (
              <>
              <SuccessLoader styles={'success-pay-form'}/>
                <div className="d-flex flex-col justify-content-center align-items-center w-100 h-100 mt-5 gap-2">
                  <span className="text-xl text-center max-w-[400px]">Hemos añadido esta compra a tu lista de órdenes</span>
                  <Link to={'/orders'}>
                    <button className="mt-3 rounded bg-black">Ver mis ordenes</button>
                  </Link>
                </div>
              </>
            )}
            {!isLoading && !completedForm && (
            <>
            <h1 className="text-xl font-bold max-w-[600px]">{product.name}</h1>
            <Currency amount={product.price} className="text-2xl font-bold" currency={true}/>
            <div className="flex flex-col">
              <label htmlFor="color" className="text-xs">Selecciona el color que quieres</label>
              <div className="flex gap-2">
                {characteristics.map((items, index) => {
                  const color =  items.color === formData?.selectedColor ? bgColors[items.color + "Selected"] : bgColors[items.color];
                  return (
                    <div key={index} className={`w-[40px] h-[40px] rounded ${color}`} onClick={(e) => handleSelectedCharacteristicsByUser({e, name: "selectedColor", value: items.color})}/>
               )})}
              </div>
            </div>
            <div>
              <label htmlFor="size" className="text-xs">Selecciona la talla que quieres</label>
              <div className="flex gap-2">
              {
                characteristics.length > 0 && characteristics.map(items => {
                  const sizes = items.color === formData.selectedColor ? items.size :[];
                  return sizes.map((size, index) => {
                  const background =  size === formData?.selectedSize ? "bg-black": "bg-gray-400";
                  return (
                    <div key={index} className={`w-[40px] h-[40px] flex items-center justify-center rounded ${background}`} onClick={(e) => handleSelectedCharacteristicsByUser({e, name: "selectedSize", value: size})}>
                      <span className="text-white font-bold text-lg">{size}</span>
                    </div>
                  )
                  })
                })
              }
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="quantity" className="text-xs">Selecciona la cantidad que quieres</label>
              <div className="flex items-center">
                <button className="w-8 h-8 bg-black flex items-center justify-center p-0 border-1 border-gray-200 disabled:cursor-not-allowed disabled:opacity-50" disabled={formData.quantity < 2} onClick={(e) => handleSelectedCharacteristicsByUser({e, name: "quantity", value: formData.quantity - 1})}>-</button>
                  <input type="number" className="w-10 h-8 rounded-none bg-black text-white text-center" name="quantity" defaultValue={1} value={formData.quantity}/>
                <button className="w-8 h-8 bg-black flex items-center justify-center p-0 border-1 border-gray-200 disabled:cursor-not-allowed disabled:opacity-50" disabled={formData.quantity > 9} onClick={(e) => handleSelectedCharacteristicsByUser({e, name: "quantity", value: formData.quantity + 1})}>+</button>
              </div>
            </div>
            <div className="flex gap-4 max-w-[400px]">
              <select onChange={handleUserInfo} name="paymentOption" id="paymentOptions" className="w-3/4 h-9 rounded ps-2 border-none focus:outline-none">
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
              {formData.paymentOption && (<button className="w-1/4 bg-black rounded h-9 flex items-center justify-center" onClick={createNewOrder}>Comprar</button>)}
            </div>
            <button className="px-0 mt-auto" onClick={() => setPage(0)}>
              <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                <g>
                  <polygon className="fill-black" points="0,256 512,512 344.276,256 512,0 	" />
                </g>
              </svg>
            </button>
            </>
            )}
          </div>
        )}
      </form>
    </>
  )

}

export default Payform;