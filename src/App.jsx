
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import MainPage from "./pages/mainPage/MainPage.jsx";
import Lubricantes  from "./pages/Sections/Lubricants.jsx";
import Producto  from "./pages/Sections/Producto.jsx";
import Store  from "./pages/Sections/Store.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";

function App() {
  return (
     <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/lubricantes" element={<Lubricantes />} />
          <Route path="/Lenceria" element={<Lubricantes />} />
          <Route path="/products/:productId" element={<Producto />} />
          <Route path="/store" element={<Store />} />
          <Route path="*" element={<h1 className="text-center" style={{minHeight: "900px"}}>Here will be a page not found. Come back soon.</h1>} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
