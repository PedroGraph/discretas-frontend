import PropTypes from "prop-types";
import { Truck, Package, Clock, PackageCheck, PackagePlus, MapPinned, Navigation, Calendar, ReceiptText } from "lucide-react";
import Loader from "../loader";
import ReceiptPopup from "./orderPopup";

export default function OrderItems({ orders, handleDownloadOrder, isLoadingDownloadButton }) {

  const status = {
    "PENDIENTE" : {
      icon: <Package className="w-6 h-6" />,
      progressBar: 20,
      cartIcon: 17,
      cartIconTablet: 96,
      cartIconMobile: 14
    },
    "ENVIADO" : {
      icon: <PackageCheck className="w-6 h-6" />,
      progressBar: 40,
      cartIcon: 37,
      cartIconTablet: 96,
      cartIconMobile: 34
    },
    "EN TRANSITO": {
      icon: <Navigation className="w-6 h-6" />,
      progressBar: 60,
      cartIcon: 57,
      cartIconTablet: 96,
      cartIconMobile: 54
    },
    "EN REPARTO": {
      icon: <Truck className="w-6 h-6" />,
      progressBar: 80,
      cartIcon: 77,
      cartIconTablet: 96,
      cartIconMobile: 74
    },
    "ENTREGADO": {
      icon: <MapPinned className="w-6 h-6" />,
      progressBar: 100,
      cartIcon: 97,
      cartIconTablet: 96,
      cartIconMobile: 94
    }
  }

  return (
    <>
      <section className="flex justify-center w-full bg-white min-h-[80vh] dark:bg-gray-900 lg:pb-10 px-4 xs:py-10">
        <div className="xs:w-full lg:w-4/6 flex flex-col xs:p-2 lg:pt-8 lg:px-8 rounded rounded-t-none gap-16">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex relative flex-col gap-2 dark:border-2 dark:border-gray-700 border-[1px] border-gray-400 rounded"
            >
              <span className="bg-[#8941FF] xs:text-xs lg:text-sm text-white absolute -left-0.5 xs:-top-5 lg:-top-6 px-4 py-1 rounded-full rounded-l-none flex gap-4 items-center">{status["ENVIADO"].icon} En reparto</span>
              <div className="bg-gray-200 dark:bg-slate-700 grid xs:flex xs:flex-col lg:grid lg:grid-cols-4 xl:grid-cols-5 xs:justify-between xs:gap-4 lg:gap-2 xs:p-4 lg:p-6 dark:border-none border-gray-400 border-b-2">
                <div className="flex gap-4 items-center lg:col-span-2">
                  <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-300 " />
                  <span className="xs:text-xs lg:text-sm dark:text-white">Fecha de entrega estimada: {new Date(order.createdAt).toDateString()}</span>
                </div>
                <div className="relative flex gap-4 w-full items-center lg:col-span-2 xl:col-span-3">
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-white dark:bg-gray-200 ">
                    <div
                      className="h-full bg-[#8941FF] absolute left-0 top-0"
                      style={{ width: `${status["ENVIADO"].progressBar}%` }}
                    ></div>
                  </div>
                  <Truck className="absolute left-50 text-gray-900 dark:text-white xs:hidden lg:flex" style={{ left: `${status["ENVIADO"].cartIcon}%`, top: "-20", transition: "left 0.3s ease" }} />
                  <Truck className="absolute left-50 text-gray-900 dark:text-white xs:flex lg:hidden h-4 w-4" style={{ left: `${status["ENVIADO"].cartIconMobile}%`, top: "0", transition: "left 0.3s ease" }} />
                </div>
              </div>
              {order.products.map((item, index) => (
                <div key={index} className="flex xs:gap-2 lg:gap-4 px-4 py-2 w-full">
                  <img
                    src={item.images[0].imageName}
                    alt={`image_${item.name}`}
                    className="h-[100px] min-w-[100px] max-w-[100px] rounded object-cover lg:w-1/6"
                  />
                  <h1 className="text-[#7b2cfa] dark:text-white lg:w-2/4 text-sm line-clamp-2">
                    <a
                      href={`/${item.category.toLowerCase()}/${item.name}_${
                        item.id
                      }`}
                    >
                      {item.name}
                    </a>
                  </h1>
                  <div
                    className={`flex flex-col ml-auto gap-2  ${
                      index === 0 ? "xs:hidden lg:flex" : "hidden"
                    }`}
                  >
                    <button className="bg-[#7b2cfa] h-8 text-white rounded xs:text-xs lg:text-sm lg:px-2 xs:min-w-[100px]" onClick={() => window.location.href = `/ordenes/${order.orderId}`}>
                      Ver detalles
                    </button>
                    <button className="bg-gray-600 h-8 text-white rounded xs:text-xs lg:text-sm text-sm lg:px-2 xs:min-w-[100px]">
                      Rastrear envío
                    </button>
                    <button className="bg-gray-600 h-8 text-white rounded xs:text-xs lg:text-sm lg:px-2 xs:min-w-[100px]">
                      Cancelar pedido
                    </button>
                  </div>
                </div>
              ))}
              <button className="absolute -bottom-7 -right-0.5 bg-gray-600 w-[170px] flex gap-4 items-center py-2 px-4 text-white text-xs rounded-full rounded-r-none" onClick={() => handleDownloadOrder(order.orderId)}>
                <ReceiptText className="w-6 h-6 text-white dark:text-gray-100 " />
               {isLoadingDownloadButton ? <Loader className="w-4 h-4" /> : " Descargar recibo "}
              </button>
            </div>
          ))}
        </div>
        {isLoadingDownloadButton && <ReceiptPopup />}
      </section>
    </>
  );
}

OrderItems.propTypes = {
  orders: PropTypes.array,
};
