
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/navbar";
import Loader from "./components/loader";
import './css/mainpage.css'

function App() {

  const Orders = lazy(() => import("./pages/orders/order"));
  const ProductDetails = lazy(() => import("./pages/productDetails/productDetails"));
  const ProductSection = lazy(() => import("./pages/products/productsection"));
  const Login = lazy(() => import("./pages/login/login"));
  const MainPage = lazy(() => import("./pages/main/mainpage"))
  const ShoppingCart = lazy(() => import("./pages/shoppingCart/shoppinCart"))

  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<Loader section={true}/>}>
                <MainPage />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<Loader section={true}/>}>
                <Login />
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={<Loader section={true}/>}>
                <Login />
              </Suspense>
            } />
            <Route path="/tienda" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ProductSection />
              </Suspense>
            } />
            <Route path="/lenceria" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ProductSection />
              </Suspense>
            } />
            <Route path="/lubricante" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ProductSection />
              </Suspense>
            } />
            <Route path="/:category/:name" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ProductDetails />
              </Suspense>
            } />
            <Route path="/ordenes" element={
              <Suspense fallback={<Loader section={true}/>}>
                <Orders />
              </Suspense>
            } />
            <Route path="/cancelados" element={
              <Suspense fallback={<Loader section={true}/>}>
                <Orders />
              </Suspense>
            } />
            <Route path="/entregados" element={
              <Suspense fallback={<Loader section={true}/>}>
                <Orders />
              </Suspense>
            } />
            <Route path="/carrito" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ShoppingCart />
              </Suspense>
            } />
             <Route path="/completarpago" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ShoppingCart />
              </Suspense>
            } />
             <Route path="/process_payment" element={
              <Suspense fallback={<Loader section={true}/>}>
                <ShoppingCart />
              </Suspense>
            } />
          </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
