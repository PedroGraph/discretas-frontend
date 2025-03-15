import { useCompletedPayment } from "../../stores/completedPaymentStore";
import { currencyFormat } from "../../utils/formats";
import { paymentCards, colorText } from "../../utils/helper";
import ImagesCarousel from "../../components/imagescarousel";
import Loader from "../../components/loader";
import { paymentStatus as paymentStatusColor, paymentStatusMessage } from "../../utils/helper";
export default function CompletedPayment() {

    const { order, loading, infoProducts, error, paymentStatus } = useCompletedPayment();
    if(loading) return (<div className="flex h-screen"><Loader /></div>);
    if(error) return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <img src="/productEmpty.webp" className="w-[300px] h-[300px]" />
            <h1 className="text-center text-2xl font-bold">Oops! Algo salió mal</h1>
            <button className="bg-[#8941ff] hover:bg-black rounded text-white px-2 py-2 text-sm" onClick={() => window.location.href = "/"}>Volver a la tienda</button>
        </div>
    );

    return (
        <>
            <section>
                <div className={`bg-slate-700 items-center text-white lg:min-h-[575px] flex flex-col gap-8 xs:min-h-[300px] w-full ${window.location.pathname === "/completarpago" && "animate-appearBackground"}`}>
                <div className={`h-10 ${paymentStatusColor[paymentStatus]} w-full`}/>
                    {
                      order?.products.length > 0 && (
                        <div className="lg:w-1/2 xs:w-5/6">
                          <ImagesCarousel images={infoProducts.images} subImages={false} text={infoProducts.text} className={" rounded h-[350px] object-cover animate-appearImage"} arrows={true} />
                        </div>
                      )
                    }
                    <h1 className="xs:text-xl lg:text-5xl xs:px-4 text-center animate-appearTitle flex flex-col xs:gap-4 lg:gap-0">
                        {!paymentStatus.includes("rej") ? (<span>¡Felicidades! <br className="xs:block lg:hidden"/> Hemos recibido tu compra.</span>)
                        :(<span>¡Lo sentimos! <br className="xs:block lg:hidden"/> No pudimos procesar tu compra.</span>)}
                         <span className="text-white xs:text-sm lg:text-lg lg:text-center xs:px-10 lg:px-0 appearTitle">
                             {paymentStatusMessage[paymentStatus]}
                         </span>
                    </h1>
                    <button className="lg:mb-4 animate-appearButton bg-gray-900 hover:bg-black rounded text-white xs:px-2 xs:py-1 xs:text-sm lg:text-base lg:px-4 lg:py-2 rounded" onClick={() => window.location.href = order?.payment?.info?.status.includes("app") ? "/ordenes" : "/tienda"}>
                        {order?.payment?.info?.status.includes("app") ? "Ver mis órdenes" : "Volver a la tienda"}
                    </button>
                    <div className={`h-10 ${paymentStatusColor[paymentStatus]} w-full`}/>
                </div>
            </section>
            <section >
                <div className="bg-gray-200 dark:bg-gray-900 text-white items-center lg:min-h-[400px] flex flex-col gap-10 lg:py-10 xs:min-h-[300px] w-full">
                    <div className="lg:w-[90%] dark:bg-gray-900 xs:gap-10 lg:gap-0 bg-white py-10 flex xs:flex-col lg:flex-row px-4 justify-center rounded">
                        <div className={`${!paymentStatus.includes("rej") ? "lg:w-1/2 lg:border-r-[1px]" : "w-100" } px-4 gap-4 border-gray-400 flex flex-col`}>
                            <h1 className="text-gray-600 text-center dark:text-white text-xl mb-4">Detalles del pedido</h1>
                            {
                                order?.products.map((product, index) => (
                                    <div className="flex gap-2 max-w-[2000px] justify-between border-gray-400 rounded" key={index}>
                                        <div className=" flex flex-col gap-2">
                                            <span className="xs:text-sm lg:text-lg text-gray-600 dark:text-white">{product.productName}</span>
                                            <span className="xs:text-xs lg:text-xl text-gray-900 font-bold dark:text-white">{currencyFormat(product.productPrice)}</span>
                                            <span className="text-xs text-gray-900 dark:text-gray-400">
                                                Cantidad: {order?.order[index]?.quantity} 
                                                {order?.order[index]?.color && (<span> / Color: {colorText[order?.order[index]?.color?.toLowerCase()]} </span>)}
                                                {order?.order[index]?.size && (<span>/ Talla: {order?.order[index]?.size} </span>)}
                                            </span>
                                        </div>
                                        <img src={product.images[0]} className="w-1/6 min-w-[100px] w-[100px] h-[100px] rounded object-cover" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`${!paymentStatus.includes("rej") ? "lg:w-1/2" : "hidden" } flex flex-col gap-2 lg:border-l-[1px] border-gray-400 px-4`}>
                            <h1 className="text-gray-600 text-xl text-center mb-4 dark:text-white">Detalles del pago</h1>
                            <ul className="xs:py-4 lg:p-4 grid xs:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
                                <li className="flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center dark:text-white">
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-start">Tarjeta de crédito</span>
                                    <div className="flex lg:justify-center lg:items-center gap-2 w-full">
                                        <span className="text-gray-600 lg:text-lg xs:text-sm lg:text-xs dark:text-gray-400">****  {order?.payment?.info?.details?.cardLastFourDigits}</span>
                                        <img src={`/payment/${Object.keys(paymentCards).find(card => card.toLowerCase().includes(order?.payment?.info?.details?.paymentMethodId.toLowerCase()))}.webp`} className="h-4 max-h-4" />
                                    </div>
                                </li>
                                <li className="flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center">
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-white">Cuotas de pago</span>
                                    <div className="flex gap-4 w-full lg:items-center">
                                        <span className="text-gray-600 w-full text-gray-600 lg:text-lg xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-gray-400">{order?.payment?.info?.details?.installments} 2</span>
                                    </div>
                                </li>
                                <li className="flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center">
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-start dark:text-white">Monto total</span>
                                    <div className="flex gap-4 w-full lg:items-center">
                                        <span className="text-gray-600 w-full text-gray-600 lg:text-lg xs:text-sm lg:text-xs lg:text-center xs:text-start dark:text-gray-400">{currencyFormat(order?.payment?.info?.details?.transactionAmount)}</span>
                                    </div>
                                </li>
                                <li className={`${!paymentStatus.includes("app") && "hidden"} flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center`}>
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-white">Titular de la tarjeta</span>
                                    <div className="flex gap-4 w-full lg:items-center">
                                        <span className="text-gray-600 w-full text-gray-600 lg:text-lg xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-gray-400">{order?.payment?.info?.details?.cardholderName}</span>
                                    </div>
                                </li>
                                <li className={`${!paymentStatus.includes("app") && "hidden"} flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center`}>
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-start dark:text-white">Documento del titular</span>
                                    <div className="flex gap-4 w-full items-center">
                                        <span className="text-gray-600 w-full xs:text-sm lg:text-xs lg:text-lg lg:text-center xs:text-start dark:text-gray-400">
                                            <span>{order?.payment?.info?.details?.cardholderIdentificationType}: </span> 
                                            {order?.payment?.info?.details?.cardholderIdentificationNumber}
                                        </span>
                                    </div>
                                </li>
                                <li className="flex xs:flex-col w-full gap-4 text-black mr-auto lg:items-center">
                                    <span className="xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-white">Correo electrónico</span>
                                    <div className="flex gap-4 w-full items-center">
                                        <span className="text-gray-600 w-full text-gray-600 lg:text-lg xs:text-sm lg:text-xs lg:text-center xs:text-end dark:text-gray-400">{order?.payment?.info?.details?.payerEmail}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}