import React, { lazy, Suspense, useEffect } from 'react';
import { useShoppingCartStore } from '../../stores/cartStore';
import { ShoppingBag, Truck, CreditCard } from 'lucide-react';
import Loader from '../../components/loader';
import Hero from '../../components/hero';
import NoShoppingCartItems from '../../components/Shopping/NoShoppingCartItems';
import ShoppingCartItems from '../../components/Shopping/shoppingCartItems';
import TotalPurchase from '../../components/Shopping/totalPurchase';
import DeliveryDetails from '../../components/Shopping/deliveryDetails';

const ShoppingCart = () => {
  const MercadoPagoForm = lazy(() => import('../../components/Shopping/mercadoPagoForm'));

  const {
    shoppingCart,
    fetchShoppingCart,
    updateQuantity,
    loading,
    deleteProductFromShopping,
    userInfo,
    handleTotal,
    handleDiscount,
    handleSubtotal,
    sections,
    updateSections
  } = useShoppingCartStore();

  useEffect(() => {
    fetchShoppingCart();
  }, [])

  if (loading) return <Loader section={true} />;
  if (shoppingCart.length === 0) return <NoShoppingCartItems userInfo={userInfo} />

  return (
    <>
      <Hero text={"Carrito de compras"} />
      <div className='flex flex-col w-full min-h-screen bg-white dark:bg-gray-900 lg:px-10 lg:py-10'>
        <div className='flex xs:flex-col lg:flex-row gap-4 w-full'>
          <div className={`flex xs:w-full lg:w-[80%] flex-col gap-4 bg-gray-200 dark:bg-slate-700 py-4 rounded-lg `}>
            <div className='grid grid-cols-3 lg:px-4 w-full'>
              <div className='flex flex-col gap-4 items-center lg:pt-4 w-full'>
                <div className='flex w-full gap-4 px-4 cursor-pointer' onClick={() => updateSections({ cartInfo: true })}>
                  <ShoppingBag className={`xs:text-lg lg:text-xl dark:text-white ${sections.deliveryInfo || sections.paymentInfo ? "text-[#3bf54a]" : "text-[#8941ff]"}`} />
                  <span className={`dark:text-white font-bold xs:text-sm lg:text-base ${sections.deliveryInfo || sections.paymentInfo ? "text-[#3bf54a]" : "text-[#8941ff]"}`}>Carrito</span>
                </div>
                {sections.cartInfo && <span className={`border-b-4 ${sections.deliveryInfo || sections.paymentInfo ?  "border-[#8941ff]" : "border-gray-200"} w-full rounded-lg`} />}
              </div>
              <div className='flex flex-col gap-4 items-center lg:pt-4 w-full'>
                <div className='flex w-full gap-4 px-4 justify-center cursor-pointer' onClick={() => updateSections({ cartInfo: true, deliveryInfo: true })}>
                  <Truck className='xs:text-lglg:text-xl text-gray-600 dark:text-white' />
                  <span className='text-gray-600 dark:text-white font-bold xs:text-sm lg:text-base'>Envio</span>
                </div>
                {sections.deliveryInfo && <span className={`border-b-4 ${sections.cartInfo && sections.paymentInfo ? "border-[#8941ff]" : "border-gray-200"} w-full rounded-lg`} />}
              </div>
              <div className='flex flex-col gap-4 items-center lg:pt-4 w-full'>
                <div className='flex w-full gap-4 px-4 justify-end cursor-pointer' onClick={() => updateSections({ cartInfo: true, deliveryInfo: true, paymentInfo: true })}>
                  <CreditCard className='xs:text-lglg:text-xl text-gray-600 dark:text-white' />
                  <span className='text-gray-600 dark:text-white font-bold xs:text-sm lg:text-base'>Pago</span>
                </div>
                {sections.paymentInfo && <span className={`border-b-4 ${"border-gray-200"} w-full rounded-lg`} />}
              </div>
              <div className='flex flex-col col-span-3 gap-4 items-center pt-4 w-full'>
              {sections.cartInfo && !sections.deliveryInfo && !sections.paymentInfo ? (
                    <ShoppingCartItems
                      products={shoppingCart}
                      updateQuantity={updateQuantity}
                      deleteProduct={deleteProductFromShopping}
                    />
                ): sections.deliveryInfo && !sections.paymentInfo ? (
                    <DeliveryDetails
                      userInfo={userInfo}
                      shoppingCart={shoppingCart}
                      updateSections={updateSections}
                      handleTotal={handleTotal}
                      handleSubtotal={handleSubtotal}
                      handleDiscount={handleDiscount}
                    />
                ):(
                  <Suspense fallback={<Loader />}>
                    <MercadoPagoForm shoppingCart={shoppingCart}/> 
                  </Suspense>
                )}
              </div>
            </div>
          </div>
          <div className='lg:w-[30%] xl:w-[20%] bg-gray-200 dark:bg-slate-700 flex justify-center p-2 rounded-lg'>
            <TotalPurchase
              sections={sections}
              handleSubtotal={handleSubtotal}
              handleDiscount={handleDiscount}
              handleTotal={handleTotal}
              updateSections={updateSections}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;