import { useOrders } from "../../stores/ordersStore";
import OrdersNavigationPanel from "../../components/Orders/navigationPanel";
import OrderHero from "../../components/hero";
import OrderItems from "../../components/Orders/orderItems";
import Loader from "../../components/loader";

export default function Orders() {

  const { orders, isLoading, error, empty, pathname, heroTitle, handleDownloadOrder, isLoadingDownloadButton } = useOrders();

  return (
    <>
      <OrderHero text={heroTitle[pathname.replace("/", "")]}/>
      <OrdersNavigationPanel pathname={pathname}/>
      {isLoading && (
        <div className="flex dark:bg-gray-900 flex-col items-center justify-center w-full min-h-[900px]">
          <Loader/>
        </div>
      )}
      {!isLoading && empty && (
        <div className="flex flex-col dark:bg-gray-900 items-center justify-center w-full min-h-[100vh] h-[600px] xs:px-4 lg:px-10 gap-2">
          <img src="/orders/empty-box.webp" alt="no orders" className="w-full max-w-[300px] lg:max-w-[500px]" />
          <span className="xs:text-lg lg:text-lg font-bold dark:text-white">Aún no has hecho tu primera compra</span>
          <span className="xs:text-sm lg:text-lg dark:text-white">¡No te preocues! Mira nuestros productos.</span>
          <button className="bg-[#8941ff] xs:py-2 mt-4 lg:p-2 text-white xs:w-1/2 lg:w-1/4 rounded" onClick={() => window.location.href = "/tienda"}>Ir a la tienda</button>
        </div>
      )}
       {!isLoading && !empty && error && (
        <div className="flex flex-col items-center justify-center w-full h-[500px]">
          <span className="text-2xl font-bold">No tienes ordenes</span>
        </div>
      )}
      {!isLoading && !empty && !error && <OrderItems orders={orders} handleDownloadOrder={handleDownloadOrder} isLoadingDownloadButton={isLoadingDownloadButton}/>}
    </>
  );
}
