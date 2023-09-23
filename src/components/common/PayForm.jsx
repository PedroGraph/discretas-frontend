import React, {useState, useEffect} from "react";
import useProductContext from "../hooks/useProductContext";
import colombia from "../../../colombia.json";
import Currency from "./CurrencyFormater";
import PaymentMethod from "./PaymentMethod";
import {SecondLoader, SuccessLoader}  from './Loader';
import '../css/payform.css';

const Payform = () => {

    const { userLogged, formData, setFormData, isLoadingForm, isCompleteForm, userInfo, productPurchased } = useProductContext();
    const [page, setPage] = useState(0);

    useEffect(() => {
      if(userLogged.length > 0){
        userInfo().then((response) => {
          setFormData(response)
        })
      }
    },[])

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
    };

    const handleSubmit = (e) => {
        e.preventDefault;
    }

    return (
        <div>
         <form onSubmit={(e) => {handleSubmit(e)}}>
            <div className=" form-modal-pay">
              <div>
                <img src={productPurchased.image[0]} alt={productPurchased.name}/>
                <img src={productPurchased?.image[0]} alt={productPurchased.name}/>
              </div>
              <div  className="pay-form "> 
              {page < 1 && !isLoadingForm && !isCompleteForm ? (
                <>
                  <div>Finaliza tu compra :)</div>
                  <input onChange={(e)=>{handleChange(e)}} type="text" name="name" placeholder="Nombre" value={formData.name}/>
                  <input onChange={(e)=>{handleChange(e)}} type="text" name="last_name" placeholder="Apellido" value={formData.last_name}/>
                  <input onChange={(e)=>{handleChange(e)}} type="text" name="email" placeholder="Correo Electrónico" value={formData.email}/>
                  <input onChange={(e)=>{handleChange(e)}} type="text" name="idt" placeholder="Cédula" value={formData.idcard}/>
                  <input onChange={(e)=>{handleChange(e)}} type="text" name="address" placeholder="Dirección" value={formData.address}/>
                  <div>
                <select
                  name="state"
                  id="state"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option hidden value="">
                    Departamento
                  </option>
                  {colombia.map((state) => (
                    <option key={state.id} value={state.departamento} selected={state.departamento === formData.state ? 'selected' : ''}>
                      {state.departamento}
                    </option>
                  ))}
                </select>
                <select
                  name="city"
                  id="city"
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
              </>
              ): !isLoadingForm && !isCompleteForm ? (
                <div className="form-payment">
                  <div>
                    <div>
                      <span>{productPurchased.name}</span>
                    </div>
                    <div>
                      <span>$<Currency amount={productPurchased.price}/></span>
                    </div>
                    <div className="separator"></div>
                    {
                      productPurchased.size && productPurchased.color && (
                        <div className="payment-characteristics">
                          <div>
                              <span>Color seleccionado</span>
                              <div style={{backgroundColor: productPurchased.color}} className="payment-characteristics-selected"></div>
                          </div>
                          <div>
                            <span>Talla seleccionada</span>
                                <div className="payment-characteristics-selected"><span>{productPurchased.size}</span></div>
                            </div>
                        </div>
                      )
                    }
                    <div className="separator"></div>
                    <div className="payment-method">
                      <PaymentMethod/>
                    </div>
                  </div>
                </div>
              ):!isCompleteForm && isLoadingForm ? ( 
                <SecondLoader styles={'loader-pay-form'}/>
              ): isCompleteForm && !isLoadingForm &&(
                <>
                <SuccessLoader styles={'success-pay-form'}/>
                  <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
                    <span>Tu compra se ha generado. Te redirigiremos a WhatsApp. ¡Gracias! :)</span>
                  </div>
                </>
              )}
              <div className={page > 0 ? "pay-form-buttons d-flex justify-content-start" : "pay-form-buttons d-flex justify-content-end"}>
               {page > 0 && !isLoadingForm && !isCompleteForm ? (
                <button onClick={(e) => {handleBackPage(e)}}>
                      <svg width="18" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                      <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/>
                      </svg>
                  </button>
                ): !isLoadingForm && !isCompleteForm && (
                  <button onClick={(e) => {handleNextPage(e)}}>
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                      <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/>
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