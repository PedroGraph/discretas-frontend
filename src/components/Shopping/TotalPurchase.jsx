import { useEffect } from "react";
import { currencyFormat } from "../../utils/formats";
import PropTypes from "prop-types";

export default function TotalPurchase({ handleSubtotal, handleDiscount, handleTotal, updateSections, sections }) {

  const goToFinishPurchase = () => {
      updateSections({
        cartInfo: true,
        deliveryInfo: true,
        paymentInfo: !sections.paymentInfo && sections.deliveryInfo && true,
      });
  };

  return (
    <>
      {
        //----------------------------DESKTOP VIEW-----------------------------
      }
      <div className={`bg-white dark:bg-slate-700 w-full max-h-[250px] rounded flex flex-col gap-2 p-4 xs:hidden lg:flex`}>
        <span className="xs:text-sm xl:text-lg text-center border-b-[1px] dark:text-white">
          Finalizar compra
        </span>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg dark:text-white">Subtotal:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg dark:text-white">
            {currencyFormat(handleSubtotal())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light dark:text-white">COP</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg dark:text-white">Descuento:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg dark:text-white">
            {currencyFormat(handleDiscount())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light dark:text-white">COP</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg dark:text-white">Total:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg dark:text-white">
            {currencyFormat(handleTotal())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light dark:text-white">COP</span>
          </span>
        </div>
        {(sections.cartInfo || sections.deliveryInfo) && !sections.paymentInfo && (
        <button
          className={`bg-[#8941ff] text-white px-4 py-1 rounded`}
          onClick={goToFinishPurchase}
        >
          Siguiente
        </button>
        )}
      </div>
      {
        //----------------------------DESKTOP VIEW-----------------------------
        //----------------------------MOBILE VIEW-----------------------------
      }
      <div className="fixed bottom-0 h-16 bg-white dark:bg-slate-700 z-30 w-full items-center shadow-t-xs shadow-[inset 0 -4px 6px rgba(0, 0, 0, 0.1)] justify-between px-4 xs:flex lg:hidden">
        <div className="flex gap-4">
          <div className="flex gap-2">
            <span className="text-lg dark:text-white">Total:</span>{" "}
            <span className="font-bold text-lg dark:text-white">
              {currencyFormat(handleTotal())}{" "}
              <span className="text-[10px] font-light dark:text-white">
                COP
              </span>
            </span>
          </div>
        </div>
        {(sections.cartInfo || sections.deliveryInfo) && !sections.paymentInfo && (
            <button
              className="bg-[#8941ff] text-white px-4 py-1 rounded"
              onClick={goToFinishPurchase}
            >
              Siguiente
            </button>
        )}
      </div>
      {
        //----------------------------MOBILE VIEW-----------------------------
      }
    </>
  );
}

TotalPurchase.propTypes = {
  updateSections: PropTypes.func.isRequired,
  handleSubtotal: PropTypes.func.isRequired,
  handleDiscount: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired
};
