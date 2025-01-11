import PropTypes from "prop-types";
import { useState } from "react";
import {
  setAsCardNumber,
  setAsCVV,
  setAsExpirationMonth,
  setAsExpirationYear,
  validateCard,
  setIdNumber
} from "../utils/formats";

export default function CreditCardForm({ handleUserInfo, userInfo }) {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
    cardholderName: "",
    identificationType: "",
    identificationNumber: "",
  });

  const handleInputChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
    handleUserInfo({ ...userInfo, paymentInfo: { ...paymentInfo, [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex justify-between gap-4 p-4 bg-gray-200" onSubmit={handleSubmit}>
      <div className="flex flex-col w-2/6">
        <label htmlFor="cardNumber" className="text-[10px]">
          Número de tarjeta
        </label>
        <input
          id="cardNumber"
          type="text"
          name="cardNumber"
          className="w-full p-2 rounded mb-4"
          value={setAsCardNumber(paymentInfo.cardNumber)}
          onChange={handleInputChange}
        />
        <div className="flex gap-4">
          <div className="flex flex-col w-[33%]">
            <label htmlFor="expirationMonth" className="text-[10px]">
              Mes de expiración
            </label>
            <input
              type="text"
              name="expirationMonth"
              placeholder="Mes de expiración"
              className="w-full p-2 rounded"
              value={setAsExpirationMonth(paymentInfo.expirationMonth)}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-[33%]">
            <label htmlFor="expirationYear" className="text-[10px]">
              Año de expiración
            </label>
            <input
              type="text"
              name="expirationYear"
              placeholder="Año de expiración"
              className="w-full p-2 rounded"
              value={setAsExpirationYear(paymentInfo.expirationYear)}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col w-[33%] mb-4">
            <label htmlFor="securityCode" className="text-[10px]">
              Código de seguridad
            </label>
            <input
              type="password"
              name="securityCode"
              placeholder="Código de seguridad"
              className="w-full p-2 rounded"
              value={setAsCVV(paymentInfo.securityCode)}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="cardholderName" className="text-[10px]">
            Nombre completo
          </label>
          <input
            type="text"
            name="cardholderName"
            className="w-full p-2 rounded"
            value={paymentInfo.cardholderName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cardholdetName" className="text-[10px]">
            Tipo de identificación
          </label>
          <select
            name="identificationType"
            id=""
            onChange={handleInputChange}
            className={`w-full p-2 rounded ${
              paymentInfo.identificationType === "" && "text-gray-400"
            }`}
          >
            <option value="" selected hidden>
              Selecciona el tipo de identificación
            </option>
            <option value="dni">Cédula de Ciudadanía</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>
        <div>
          <label htmlFor="identificationNumber" className="text-[10px]">
            Número de identificación
          </label>
          <input
            type="number"
            name="identificationNumber"
            placeholder="Número de identificación"
            className="w-full p-2 rounded"
            value={setIdNumber(paymentInfo.identificationNumber)}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex w-3/6 gap-4 items-center">
        <div className="min-h-[200px] flex flex-col w-1/2 border-[1px] border-gray-600 rounded p-4 bg-gray-800">
          <h1 className="text-sm font-semibold text-white mb-4">
            Credit / Debit Card
          </h1>
          <h1 className="text-xl font-semibold text-white my-4">
            {setAsCardNumber(paymentInfo.cardNumber)}
          </h1>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-white my-4">
              {paymentInfo.cardholderName}
            </h1>
            <h1 className="text-lg font-semibold text-white my-4 flex">
              {setAsExpirationMonth(paymentInfo.expirationMonth)} {paymentInfo.expirationYear && "/"} {setAsExpirationYear(paymentInfo.expirationYear)}
            </h1>
          </div>
          <div>
            {console.log(validateCard(paymentInfo.cardNumber.replaceAll(" ", "")))}
            {paymentInfo.cardNumber && validateCard(paymentInfo.cardNumber) && <img src={`/payment/${validateCard(paymentInfo.cardNumber).type}.webp`} alt={validateCard(paymentInfo.cardNumber).type} className="w-20 h-10 ml-auto" />}
          </div>
        </div>
        <div className="flex flex-col w-1/2 justify-end items-end mt-auto">
          <button className="bg-[#8941ff] w-2/6 p-2 rounded text-white">Guardar</button>
        </div>
      </div>
    </form>
  );
}

CreditCardForm.propTypes = {
  handleUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
};
