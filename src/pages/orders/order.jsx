import useOrders from "../../hooks/useOrders";
import OrdersNavigationPanel from "../../components/Orders/navigationPanel";
import OrderHero from "../../components/hero";
import OrderItems from "../../components/Orders/orderItems";
import Loader from "../../components/loader";

export default function Orders() {

  const { orders, isLoading, error, empty, pathname, heroTitle } = useOrders();

  return (
    <>
      <OrderHero text={heroTitle[pathname.replace("/", "")]}/>
      <OrdersNavigationPanel pathname={pathname}/>
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full h-[500px]">
          <Loader/>
        </div>
      )}
      {!isLoading && empty && (
        <div className="flex flex-col items-center justify-center w-full h-[500px]">
          <span className="text-2xl font-bold">No tienes ordenes</span>
        </div>
      )}
       {!isLoading && !empty && error && (
        <div className="flex flex-col items-center justify-center w-full h-[500px]">
          <span className="text-2xl font-bold">No tienes ordenes</span>
        </div>
      )}
      {!isLoading && !empty && !error && <OrderItems orders={orders}/>}
    </>
  );
}
