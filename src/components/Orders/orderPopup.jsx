import { useState } from "react";
import { Mail } from "lucide-react";

const ReceiptPopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg max-w-xl w-11/12 text-center">
        <div className="mb-4">
          <div className="xs:text-xl lg:text-5xl text-purple-500 mb-3 flex justify-center"><Mail className="w-10 h-10" /></div>
          <h2 className="xs:text-xl lg:text-2xl font-semibold text-purple-500">Recibo enviado a tu correo electrónico</h2>
        </div>
        <div className="xs:text-xs sm:text-sm lg:text-base mb-5 text-gray-700 flex flex-col gap-4 dark:text-white">
          <p>El recibo de tu compra ha sido enviado a tu correo electrónico para que puedas consultar el estado de la compra.</p>
          <p>Por favor, revisa tu bandeja de entrada.</p>
        </div>
        <button
          className="bg-purple-500 text-white xs:text-sm lg:text-base px-4 py-2 rounded-lg text-lg hover:bg-purple-600"
          onClick={() => setIsVisible(false)}
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default ReceiptPopup;
