import { useMercadoPago } from "../../hooks/useMercadoPago";
import CardPreview from "../cardPreview";


export default function MercadoPagoForm() {
  
    const { cardPreviewData, memoizedCardPayment } = useMercadoPago();

  return (
    <div className="flex gap-8 p-8 w-full">
      <div id="cardPaymentBrick_container" className="w-1/2">
        {memoizedCardPayment}
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <CardPreview cardData={cardPreviewData} />
      </div>
    </div>
  );
}
