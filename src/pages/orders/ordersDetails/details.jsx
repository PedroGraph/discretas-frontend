import { useEffect } from "react";
import { Calendar, Package, MapPin, CreditCard, Mail, Phone, User2Icon, PackageX, MapPinHouseIcon } from "lucide-react";
import { useOrders } from "../../../stores/ordersStore";
import { useLocation } from "react-router-dom";
import Loader from "../../../components/loader";
import { currencyFormat } from "../../../utils/formats";

export default function OrderDetails() {

    const location = useLocation();
    const { orderDetails, getOrderDetails, isLoading, error, user } = useOrders();
    const { pathname } = location;
    const orderId = pathname.split('/').pop();

    useEffect(() => {
        getOrderDetails(orderId);
    }, [user]);

    if (isLoading) return (<div className="flex h-screen"><Loader /></div>);
    if(error) return (<div className="text-black h-screen flex items-center justify-center">Error al cargar los detalles del pedido</div>);

    return orderDetails && orderDetails.userInfo && (
        <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 justify-center w-full lg:py-2">
            <div className="flex flex-col gap-4 w-full items-center h-full">
                <div className="xs:w-full lg:w-5/6 lg:pt-4 flex flex-col items-center">
                    <div className="bg-[#8941FF] w-full p-8 dark:border-[1px] dark:border-none dark:border-b-none text-white flex flex-col gap-4 font-bold lg:rounded-t-lg">
                        <h1 className="xs:text-2xl lg:text-3xl">Pedido #{orderId}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-[#8941FF] text-xs bg-white px-4 py-1 text-sm rounded-full">{"Reparto"}</span>
                            <span className="flex gap-1 text-sm"><Calendar className="w-5 h-5" /> {new Date(orderDetails.createdAt).toDateString()}</span>
                        </div>
                    </div>
                    <div className="min-h-[300px] dark:border-[1px] dark:border-none dark:border-t-none bg-white dark:bg-slate-700 w-full flex flex-col gap-4 shadow-lg rounded-b-lg xs:p-4 lg:p-4">
                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2 rounded w-full">
                            <div className="flex flex-col border-[1px] dark:border-none lg:rounded-lg w-full gap-1 p-8 dark:bg-slate-500">
                                <h1 className="flex items-center font-bold gap-2 xs:text-xl lg:text-lg xl:text-2xl text-[#8941FF] dark:text-white">
                                    <MapPin className="w-6 h-6" /> Dirección de envío
                                </h1>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    {orderDetails.shippingAddress.address}
                                </span>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    {orderDetails.shippingAddress.city} - {orderDetails.shippingAddress.state}
                                </span>
                            </div>
                            <div className="flex flex-col border-[1px] dark:border-none lg:rounded-lg w-full gap-1 p-8 dark:bg-slate-500">
                                <h1 className="flex items-center gap-2 font-bold xs:text-xl lg:text-lg xl:text-2xl text-[#8941FF] dark:text-white">
                                    <CreditCard className="w-6 h-6" /> Información de pago
                                </h1>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    Tarjeta: **** {orderDetails.paymentInfo.cardLastFourDigits}
                                </span>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    Titular: {orderDetails.paymentInfo.cardholderName}
                                </span>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    Total: {currencyFormat(orderDetails.paymentInfo.netAmount)}
                                </span>
                            </div>
                            <div className="flex flex-col border-[1px] dark:border-none lg:rounded-lg w-full gap-1 p-8 sm:col-span-2 lg:col-span-1 dark:bg-slate-500">
                                <h1 className="flex items-center gap-2 font-bold xs:text-xl lg:text-lg xl:text-2xl text-[#8941FF] dark:text-white">
                                    <User2Icon className="w-6 h-6 text-[#8941FF] font-bold dark:text-white" /> 
                                    Información de cliente
                                </h1>
                                <span className="xs:text-sm lg:text-base dark:text-white">
                                    {orderDetails?.userInfo?.firstName} {orderDetails?.userInfo?.lastName}
                                </span>
                                <span className="flex gap-2 items-center xs:text-sm lg:text-base dark:text-white">
                                    <Mail className="w-4 h-4 text-[#8941FF] font-bold dark:text-white" /> {orderDetails?.userInfo?.email}
                                </span>
                                <span className="flex gap-2 items-center xs:text-sm lg:text-base dark:text-white">
                                    <Phone className="w-4 h-4 text-[#8941FF] font-bold dark:text-white" />
                                    +57 {orderDetails?.userInfo?.phoneNumber}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col border-[1px] dark:border-none lg:rounded-lg w-full xs:gap-4 lg:gap-4 xs:p-0 lg:p-8 dark:bg-slate-500">
                            <h1 className="flex items-center font-bold gap-2 xs:px-8 xs:pt-8 lg:p-0 xs:text-xl lg:text-2xl text-[#8941FF] dark:text-white">
                                <Package className="w-6 h-6" /> Productos
                            </h1>
                            <div className="flex flex-col w-full items-center h-full">
                            <div className="grid xs:grid-cols-5 lg:grid-cols-7 gap-4 bg-slate-400 text-white py-2 rounded w-full">
                                <span className="text-center font-bold text-sm xs:col-span-3 sm:col-span-2 col-span-1">Producto</span>
                                <span className="text-center font-bold text-sm col-span-2 xs:block lg:hidden">Detalles</span>
                                <span className="text-center font-bold text-sm xs:hidden lg:block">Cantidad</span>
                                <span className="text-center font-bold text-sm xs:hidden lg:block">Precio</span>
                                <span className="text-center font-bold text-sm xs:hidden lg:block">Color</span>
                                <span className="text-center font-bold text-sm xs:hidden lg:block">Talla</span>
                                <span className="text-center font-bold text-sm xs:hidden lg:block">Total</span>
                            </div>
                            {orderDetails.products.map((order, index) => (
                                <div key={index} className="grid xs:grid-cols-5 lg:grid-cols-7 gap-4 py-2 rounded w-full cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900 lg:px-4" onClick={() => window.location.href = `/${order.category.toLowerCase()}/${order.name}_${order.id}`}>
                                    <span className="flex gap-2 xs:col-span-3 sm:col-span-2">
                                        <img src={order.images[0].imageName} alt={order.name} className="w-1/6 xs:min-w-[50px] xs:w-[50px] xs:h-[50px] lg:min-w-[100px] lg:w-[100px] lg:h-[100px] rounded object-cover" />
                                        <span className="xs:text-xs lg:text-base font-medium text-gray-800 dark:text-white">{order.name}</span>
                                    </span>
                                    <span className="text-center text-base xs:hidden lg:block dark:text-white">{order.quantity}</span>
                                    <span className="text-center text-base xs:hidden lg:block dark:text-white">{currencyFormat(order.price)}</span>
                                    <span className="text-center text-base xs:hidden lg:block dark:text-white">{order.color}</span>
                                    <span className="text-center text-base xs:hidden lg:block dark:text-white">{order.size}</span>
                                    <span className="text-center text-base xs:hidden lg:block dark:text-white">{currencyFormat(order.price * order.quantity)}</span>
                                    <span className="xs:flex flex-col col-span-2 lg:hidden sm:px-4 lg:px-0">
                                        <span className="xs:text-center sm:text-end text-xs dark:text-white">Cantidad:{order.quantity}</span>
                                        <span className="xs:text-center sm:text-end text-xs dark:text-white">Precio: {currencyFormat(order.price)}</span>
                                        {order.color && <span className="xs:text-center sm:text-end text-xs dark:text-white">Color: {order.color}</span>}
                                        {order.size && <span className="xs:text-center sm:text-end text-xs dark:text-white">Talla: {order.size}</span>}
                                        <span className="xs:text-center sm:text-end text-xs dark:text-white">Total: {currencyFormat(order.price * order.quantity)}</span>
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-bewteen w-full items-center text-xl xs:p-4 lg:p-0 lg:py-2 font-bold">
                                <div className="w-1/2 flex gap-2 items-center">
                                    <button className="text-sm py-2 px-4 bg-black flex gap-2 text-white rounded-lg">
                                        <PackageX className="w-4 h-4 text-white" />
                                        Cancelar pedido
                                    </button>
                                    <button className="text-sm py-2 px-4 bg-[#8941ff] flex gap-2 text-white rounded-lg">
                                        <MapPinHouseIcon className="w-4 h-4 " />
                                        Rastrear pedido
                                    </button>
                                </div>
                                <div className="w-1/2 flex gap-2 items-center justify-end dark:text-white">
                                    <span>Total: {currencyFormat(orderDetails.products.reduce((total, product) => total + (product.price * product.quantity), 0))}</span>
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
