import { currencyFormat } from "../../utils/formats";
import { useShoppingCart } from "../../hooks/useShoppingCart";
import PropTypes from "prop-types";

export default function TotalPurchase({ setSections }) {
  const { handleSubtotal, handleDiscount, handleTotal } = useShoppingCart();
  const goToFinishPurchase = () => {
    const location = window.location.pathname;
    if (location === "/completarpago")
      return setSections({
        personalInfo: false,
        paymentInfo: true,
        finalInfo: false,
      });
    window.location.href = "/completarpago";
  };
  return (
    <>
      {
        //----------------------------DESKTOP VIEW-----------------------------
      }
      <div
        className={`bg-white max-w-[400px] rounded flex flex-col gap-2 p-4 xs:hidden lg:flex`}
      >
        <span className="xs:text-sm xl:text-lg text-center border-b-[1px]">
          Finalizar compra
        </span>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg">Subtotal:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg">
            {currencyFormat(handleSubtotal())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light">COP</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg">Descuento:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg">
            {currencyFormat(handleDiscount())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light">COP</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="xs:text-sm xl:text-lg">Total:</span>{" "}
          <span className="font-bold xs:text-sm xl:text-lg">
            {currencyFormat(handleTotal())}{" "}
            <span className="xs:text-[8px] xl:text-[10px] font-light">COP</span>
          </span>
        </div>
        <button
          className="bg-[#8941ff] text-white px-4 py-1 rounded mt-auto"
          onClick={goToFinishPurchase}
        >
          Comprar
        </button>
        {window.location.pathname === "/completarpago" && (
          <button
            className="bg-[#000] text-white px-4 py-1 rounded mt-auto"
            onClick={goToFinishPurchase}
          >
            Cancelar compra
          </button>
        )}
      </div>
      {
        //----------------------------DESKTOP VIEW-----------------------------
        //----------------------------MOBILE VIEW-----------------------------
      }
      <div className="fixed bottom-0 h-16 bg-white z-30 w-full items-center shadow-md shadow-[#8941ff] justify-between px-4 xs:flex lg:hidden">
        <div className="flexgap-4">
          <div className="flex gap-2">
            <span className="text-lg">Total:</span>{" "}
            <span className="font-bold text-lg">
              {currencyFormat(handleTotal())}{" "}
              <span className="text-[10px] font-light">
                COP
              </span>
            </span>
          </div>
        </div>

        <button
          className="bg-[#8941ff] text-white px-4 py-1 rounded"
          onClick={goToFinishPurchase}
        >
          Comprar
        </button>
        {window.location.pathname === "/completarpago" && (
          <button
            className="bg-[#000] text-white px-4 py-1 rounded"
            onClick={goToFinishPurchase}
          >
            Cancelar compra
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
  setSections: PropTypes.func.isRequired,
};
