import { useMercadoPago } from "../../hooks/useMercadoPago";
import Loader from "../loader";
import CardPreview from "../cardPreview";
import PropTypes from "prop-types";

export default function MercadoPagoForm() {
  const { cardPreviewData, memoizedCardPayment, status } = useMercadoPago();
  console.log(status)
  return (
    <div className="flex dark:bg-gray-900 xl:flex-row xs:flex-col xs:gap-4 lg:gap-8 xs:px-0 xs:py-4 lg:p-8 w-full">
      <div id="cardPaymentBrick_container" className="xl:w-1/2 xs:order-2 xl:order-1 flex">
        {status === "loading" ? <Loader />  : memoizedCardPayment}
      </div>
      <div className="xl:w-1/2  flex items-center justify-center xs:order-1 xl:order-2">
        <CardPreview cardData={cardPreviewData} />
      </div>
    </div>
  );
}

MercadoPagoForm.propTypes = {
  shoppingCart: PropTypes.array.isRequired,
};
