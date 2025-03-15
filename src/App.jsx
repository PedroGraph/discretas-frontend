import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/navbar";
import Loader from "./components/loader";
import Footer from "./components/footer";
import './css/mainpage.css';
import { routes } from "./config/routes";

function App() {
  const components = {
    MainPage: lazy(() => import("./pages/main/mainpage")),
    Login: lazy(() => import("./pages/login/login")),
    ProductSection: lazy(() => import("./pages/products/productsection")),
    ProductDetails: lazy(() => import("./pages/products/productDetails/details")),
    Orders: lazy(() => import("./pages/orders/order")),
    OrderDetails: lazy(() => import("./pages/orders/ordersDetails/details")),
    ShoppingCart: lazy(() => import("./pages/shopping/shoppinCart")),
    CompletedPayment: lazy(() => import("./pages/completedPayment/completedpayment")),
    Profile: lazy(() => import("./pages/profile/profile")),
    NotFound: lazy(() => import("./pages/404/404")),
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense fallback={<Loader section={true} />}>
                  {React.createElement(components[route.component])}
                </Suspense>
              }
            />
          ))}
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
