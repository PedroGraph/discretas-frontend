import React, { useEffect, useState } from "react";
import useProductContext from "../hooks/useProductContext";
import { SecondLoader, SuccessLoader } from "./Loader";
import colombia from "../../../colombia.json";
import PaymentMethod from "./PaymentMethod";
import "../css/checkout.css";

const Checkout = () => {
  const { formData, setFormData, userInfo, isCompleteForm, isLoadingForm, userLogged } = useProductContext();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let ciudades = [];
    if (userLogged.length > 0) {
      userInfo().then((response) => {
        response.idt = "";
        setFormData(response);
      });
    }

    if(!cities.length > 0){
      colombia.map((departamentos) => { 
        ciudades[departamentos.departamento] = departamentos.ciudades;
      });
      setCities(prevCities => {
        return ciudades
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="checkout-section p-5 pt-1 d-flex justify-content-center ">
        <div key={1} className="text-center">
          <label> FINALIZA TU COMPRA </label>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Escribe tu nombre"
              value={formData.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Escribe tu Apellido"
              value={formData.last_name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Escribe tu teléfono"
              value={formData.phone}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="email"
              placeholder="Escribe tu email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="idt"
              placeholder="Escribe tu Cédula"
              value={formData.idt}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div>
              <select
                name="department"
                id="department"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option hidden value="">
                  Departamento
                </option>
                {colombia.map((department) => (
                  <option key={department.id} value={department.departamento}>
                    {department.departamento}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {
                cities.length > 0 && formData.department && (
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
                    {cities[formData.department].map((ciudad, index) => (
                    <option key={index} value={ciudad}>
                        {ciudad}
                    </option>
                    ))}
                </select>
                )
              }
              
            </div>
          </form>
        </div>
        <div key={2} className="shopping d-flex flex-column">
        { !isCompleteForm && isLoadingForm ? ( 
            <SecondLoader styles={'loader-checkout-form'}/>
          ): isCompleteForm && !isLoadingForm ?(
            <>
            <SuccessLoader styles={'success-checkout-form'}/>
              <div className="d-flex justify-content-center align-items-center w-100 h-100 mt-5">
                <span>Tu compra se ha generado. Te redirigiremos a WhatsApp. ¡Gracias! :)</span>
              </div>
            </>
          ):(
            <PaymentMethod/>
          )
        }
        </div>
      </div>
    </>
  );
};

export default Checkout;
