import React, { lazy, Suspense } from 'react';
import { useShoppingCart } from '../../hooks/useShoppingCart';
import Loader from '../../components/loader';
import Hero from '../../components/hero';
import NoShoppingCartItems from '../../components/ShoppingCart/NoShoppingCartItems';
import { useLocation } from 'react-router-dom';

const ShoppingCartItems = lazy(() => import('../../components/ShoppingCart/shoppingCartResume'));
const FinishPurchaseFromShoppingCart = lazy(() => import('../../components/ShoppingCart/finishPurchase'));

const ShoppingCart = () => {
  const location = useLocation();
  const {
    shoppingCart,
    updateQuantity,
    loading,
    error,
    deleteProductFromShopping,
    userInfo,
    handleUserInfo,
  } = useShoppingCart();

  if (loading) return <Loader section={true} />;

  return (
    <>
      <Hero text={"Carrito de compras"} />
      {location.pathname.includes("completarpago") && shoppingCart.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <FinishPurchaseFromShoppingCart userInfo={userInfo} handleUserInfo={handleUserInfo} shoppingCart={shoppingCart} />
        </Suspense>
      ) : shoppingCart.length === 0 ? (
        <NoShoppingCartItems />
      ) : (
        <Suspense fallback={<Loader />}>
          <ShoppingCartItems
            products={shoppingCart}
            updateQuantity={updateQuantity}
            deleteProduct={deleteProductFromShopping}
            loading={loading}
            error={error}
          />
        </Suspense>
      )}
    </>
  );
};

export default React.memo(ShoppingCart);