import PropTypes from "prop-types";
import PackageIcon from "../icons/package";
import DateIcon from "../icons/date";
import InvoiceIcon from "../icons/invoice";
import LocationIcon from "../icons/location";
import DeliverPointIcon from "../icons/deliverpoint";
import { currencyFormat } from "../../utils/formats";

export default function OrderItems({ orders }) {
  return (
    <>
      <section className="flex justify-center w-full bg.white h-screen">
        <div className="xs:w-full lg:w-4/6 flex flex-col xs:p-2 lg:pt-8 lg:px-8 rounded rounded-t-none gap-2">
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border-[1px] border-gray-400 rounded "
            >
              <div className="bg-gray-100 grid md:grid-cols-5 gap-2 py-2 px-4 border-gray-400 border-b-2">
                <div className="flex xs:flex-col md:flex-row gap-2 xs:justify-start md:items-start md:justify-start xs:hidden md:flex">
                  <PackageIcon className={`lg:w-8 lg:h-8 xs:w-6 flex`} />
                  <div className="flex flex-col">
                    <span className="md:text-xs 2xl:text-sm font-bold xs:hidden lg:block">
                      Orden #
                    </span>
                    <span className="md:text-xs 2xl:text-sm">
                      {order.orderId}
                    </span>
                  </div>
                </div>
                <div className="flex xs:flex-col md:flex-row gap-2 xs:justify-start md:items-start xs:hidden md:flex">
                  <LocationIcon className={`lg:w-8 lg:h-8 xs:w-6`} />
                  <div className="flex flex-col">
                    <span className="md:text-xs 2xl:text-sm font-bold xs:hidden lg:block">
                      Dirección
                    </span>
                    <div className="line-clamp-2">
                      <span className="md:text-xs 2xl:text-sm">
                        {order.shippingAddress.address}{" "}
                      </span>
                      <span className="md:text-xs 2xl:text-sm">
                        {order.shippingAddress.city} -{" "}
                        {order.shippingAddress.state}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex xs:flex-col md:flex-row gap-2 xs:justify-start md:items-start md:justify-center xs:hidden md:flex">
                  <DateIcon className={`lg:w-8 lg:h-8 xs:w-6`} />
                  <div className="flex flex-col justify-center">
                    <span className="md:text-xs 2xl:text-sm font-bold xs:hidden lg:block">
                      Fecha de compra
                    </span>
                    <span className="md:text-xs 2xl:text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex xs:flex-col md:flex-row gap-2 xs:justify-start md:items-start md:justify-end xs:hidden md:flex">
                  <DeliverPointIcon className={`lg:w-10 lg:h-10 xs:w-6`} />
                  <div className="flex flex-col">
                    <span className="md:text-xs 2xl:text-sm font-bold xs:hidden lg:block">
                      Fecha de entrega
                    </span>
                    <span className="md:text-xs 2xl:text-sm">
                      {new Date(
                        new Date(order.createdAt).setDate(
                          new Date(order.createdAt).getDate() + 7
                        )
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex xs:flex-col md:flex-row gap-2 xs:justify-start md:items-start md:justify-end xs:hidden md:flex">
                  <InvoiceIcon className={`lg:w-8 lg:h-8 xs:w-6`} />
                  <div className="flex flex-col">
                    <span className="md:text-xs 2xl:text-sm font-bold xs:hidden lg:block">
                      Total
                    </span>
                    <span className="md:text-xs 2xl:text-sm">
                      {currencyFormat(
                        order.products.reduce(
                          (a, b) => (a + b.price) * b.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                </div>
                <div className="xs:flex md:hidden justify-between">
                  <div className="flex gap-4 items-center">
                    <DeliverPointIcon className={`lg:w-8 lg:h-8 xs:w-8`} />
                    <span className="font-bold text-sm">Enviado</span>
                  </div>
                  <button className="bg-[#7b2cfa] text-white rounded xs:text-xs lg:text-sm lg:px-2 xs:min-w-[100px]">
                    Ver detalles
                  </button>
                </div>
              </div>
              {order.products.map((item, index) => (
                <div key={index} className="flex gap-4 px-4 py-2 w-full">
                  <img
                    src={"https://via.placeholder.com/200x200"}
                    alt={`image_${item.name}`}
                    className="h-[100px] max-w-[200px] rounded object-cover lg:w-1/6"
                  />
                  <h1 className="text-[#7b2cfa] lg:w-2/4 text-sm line-clamp-2">
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
                    <button className="bg-[#7b2cfa] h-8 text-white rounded xs:text-xs lg:text-sm lg:px-2 xs:min-w-[100px]">
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
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

OrderItems.propTypes = {
  orders: PropTypes.array,
};
