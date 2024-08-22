import React, {useState, useEffect} from "react";
import useProductContext from "../hooks/useProductContext";
import colombia from "../../../colombia.json";
import Currency from "./CurrencyFormater";
import PaymentMethod from "./PaymentMethod";
import {SecondLoader, SuccessLoader}  from './Loader';
import '../css/payform.css';
import { Link } from "react-router-dom";

const Payform = ({product}) => {
    const { characteristics } = product;
    const { userLogged, formData, setFormData, isLoadingForm, isCompleteForm, userInfo, productPurchased } = useProductContext();
    const [page, setPage] = useState(0);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    const discount = (Math.floor(Math.random() * 100) + 1)
    const priceWithDiscount = productPurchased.price - (( discount * productPurchased.price) / 100 )

    useEffect(() => {
      if(userLogged.length > 0){
        userInfo().then((response) => {
          setFormData(response)
        })
      }
    },[])

    useEffect(() => {
      if (characteristics){
        setSelectedColor(characteristics[0]?.color);
        setSelectedSize(characteristics[0].size[0]);
      }
    }, [product]);

    const handleNextPage = (e) =>{
        e.preventDefault();
        setPage(prevState =>{
            return prevState+1;
        })
    }

    const handleBackPage = (e) => {
        e.preventDefault();
        setPage(prevState =>{
            return prevState-1;
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        setFormData((prevData) => {
          const characteristics = {
            color: selectedColor,
            size: selectedSize,
          }

          return {
            ...prevData,
            characteristics
          }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault;
    }

    return (
        <div>
         <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className="form-modal-pay">
              <div>
                <img className="xl:blur-sm" src={productPurchased.images[0].imageName} alt={productPurchased.name}/>
                <img className="hidden xl:block w-full max-w-[350px] h-auto absolute left-[20%] top-[5%] -translate-x-[15%] translate-y-[5%] rounded-[10px]      
                      xl:w-[40%] xl:max-w-[400px] xl:h-auto xl:top-[50%] xl:left-[10%] xl:-translate-x-[10%] xl:-translate-y-[50%]"
                      src={productPurchased?.images[0].imageName} alt={productPurchased.name}/>
              </div>
              <div  className="py-3 px-4 d-flex flex-col gap-3 min-h-[400px]"> 
              {page < 1 && !isLoadingForm && !isCompleteForm ? (
                <>
                  <div className="text-center text-lg mt-3">Finaliza tu compra :)</div>
                  <div className="d-flex gap-3">
                    <input onChange={(e)=>{handleChange(e)}} className="rounded" type="text" name="name" placeholder="Nombre" value={formData.firstName}/>
                    <input onChange={(e)=>{handleChange(e)}} className="rounded" type="text" name="last_name" placeholder="Apellido" value={formData.lastName}/>
                  </div>
                  <input onChange={(e)=>{handleChange(e)}} className="rounded" type="text" name="email" placeholder="Correo Electrónico" value={formData.email}/>
                  <input onChange={(e)=>{handleChange(e)}} className="rounded" type="text" name="idt" placeholder="Cédula" />
                  <input onChange={(e)=>{handleChange(e)}} className="rounded" type="text" name="address" placeholder="Dirección" value={formData.address}/>
                <div>
                <div className="d-flex flex-col gap-3">
                <select
                  name="state"
                  id="state"
                  className="rounded h-9 text-gray-700 bg-white px-2"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option hidden value="">
                    Departamento
                  </option>
                  {colombia.map((state) => (
                    <option key={state.id} value={state.departamento} selected={state.departamento === formData.city ? 'selected' : ''}>
                      {state.departamento}
                    </option>
                  ))}
                </select>
                <select
                  name="city"
                  id="city"
                  className="rounded h-9 text-gray-700 bg-white px-2"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option hidden value="">
                    Ciudad
                  </option>
                  {colombia.map((state, stateIndex) => {
                    if (state.departamento === formData.state) {
                      return state.ciudades.map((city, cityIndex) => (
                        <option
                          key={`${stateIndex}-${cityIndex}`}
                          value={city}
                          selected={city === formData.city ? 'selected' : ''}
                        >
                          {city}
                        </option>
                      ));
                    }
                  })}
                </select>
                </div>
              </div>
              </>
              ): !isLoadingForm && !isCompleteForm ? (
                <div className="form-payment">
                  <div>
                    <div>
                      <span className="text-sm mt-2">{productPurchased.name}</span>
                    </div>
                    <div className="d-flex gap-2 items-end">
                      <span className="text-2xl font-bold">
                        <Currency amount={priceWithDiscount} currency={true}/>
                      </span>
                      <span className="text-red-600 mb-1 px-1">{discount}%</span>
                      <s className="text-lg font-bold mb-1 text-gray-500"><Currency amount={productPurchased.price} /></s>
                    </div>
                    {
                      !productPurchased.size && !productPurchased.color && (
                        <div className="d-flex flex-column ">
                          <span className="text-xs font-bold">Color seleccionado</span>
                          <div className="d-flex gap-2">
                          {
                            characteristics.length > 0 &&characteristics.map((items, index) => {
                              const color = items.color ? `bg-${items.color.toLowerCase()}-${selectedColor === items.color ? "500" : "400"}` : 'bg-white';
                              return(
                              <span key={index} className={`border-2 rounded ${color} h-10 w-10 p-1`} onClick={() => setSelectedColor(items.color)}>
                                {items.color === selectedColor && (
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                )}
                              </span>
                              )
                            })
                          } 
                          </div>
                          <div className="d-flex flex-col gap-2 pt-3">
                            <span className="text-xs font-bold">Talla seleccionada</span>
                            <div className="d-flex gap-2">
                              {
                                characteristics.length > 0 && characteristics.map(items => {
                                  const sizes = items.color === selectedColor ? items.size : [];
                                  return sizes.map((size, index) => {
                                  return (<span key={index} onClick={() => setSelectedSize(size)} className={`border-2 rounded h-10 w-10 text-center p-1 ${selectedSize === size ? "bg-black text-white" : "bg-gray-300"}`}>
                                    <span className='text-xs'>{size}</span>
                                  </span>)
                                  })
                                })
                              }
                            </div>
                            
                            </div>
                        </div>
                      )
                    }
                    <div className="payment-method">
                      <PaymentMethod userInfo={formData} products={[productPurchased]}/>
                    </div>
                  </div>
                </div>
              ):!isCompleteForm && isLoadingForm ? ( 
                <SecondLoader styles={'loader-pay-form'}/>
              ): isCompleteForm && !isLoadingForm &&(
                <>
                <SuccessLoader styles={'success-pay-form'}/>
                  <div className="d-flex flex-col justify-content-center align-items-center w-100 h-100 mt-5 gap-2">
                    <span className="text-2xl">Tu compra se ha procesado.</span>
                    <Link to={'/orders'}>
                      <button className="mt-3 rounded bg-black">Ver mis ordenes</button>
                    </Link>
                  </div>
                </>
              )}
              <div className={page > 0 ? "absolute top-2 d-flex justify-content-start xl:left-2" : " d-flex justify-content-end"}>
               {page > 0 && !isLoadingForm && !isCompleteForm ? (
                <button className=" px-2 rounded min-w-20" onClick={(e) => {handleBackPage(e)}}>
                     <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                      <g>
                        <polygon style={{fill: '#FFFFFF'}} points="0,256 512,512 344.276,256 512,0 	" />
                      </g>
                    </svg>
                  </button>
                ): !isLoadingForm && !isCompleteForm && (
                  <button className="px-2 rounded" onClick={(e) => {handleNextPage(e)}}>
                    <svg height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                      <g>
                        <polygon style={{fill: '#000000'}} points="512,256 0,0 167.724,256 0,512 	" />
                      </g>
                    </svg>
                  </button>
                )}
              </div>
              </div>
            </div>
         </form>
        </div>
    )

}

export default Payform;