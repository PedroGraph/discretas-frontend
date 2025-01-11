import { useState } from "react";
import PropTypes from "prop-types";
import CreditCardIcon from "../icons/creditcard";
import ArrowLeftIcon from "../icons/arrowLeft";
import MercadoPagoForm from "./mercadoPagoForm";

export default function PaymentInfo({ userInfo, setSections }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-[575px] w-full">
      <div className="flex w-full">
      <button
          className=" p-2 text-white px-4 rounded"
          onClick={() =>
            setSections({
              personalInfo: false,
              paymentInfo: false,
              finalInfo: true,
            })
          }
        >
          <ArrowLeftIcon className="w-10 h-10 text-black" />
        </button>
        <h2 className="text-2xl text-center font-semibold text-gray-800 p-4">
        Método de pago
      </h2>
      </div>

      <div className="relative w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-start p-3 gap-4 rounded-lg
                 bg-gray-100 border-2 border-gray-200 hover:border-[#bda3e9]
                 text-gray-700 font-medium transition-all duration-300"
        >
          <CreditCardIcon className={"w-30 h-20"} />{" "}
          <span>Tarjeta de crédito / débito (Mercado Pago)</span>
        </button>
        <div
          className={`e
          w-full bg-white rounded-lg 
          transform transition-all duration-700 ease-in-out
        
        border-gray-100  origin-top z-10
          ${isOpen ? "block opacity-100 scale-y-100" : "hidden"}
        `}
        >
          {/* <CreditCardForm handleUserInfo={handleUserInfo} userInfo={userInfo} /> */}
          <MercadoPagoForm userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}

PaymentInfo.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setSections: PropTypes.func.isRequired,
};
