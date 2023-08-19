
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import MainPage from "./pages/mainPage/MainPage.jsx";
import Lubricantes  from "./pages/Sections/Lubricants.jsx";
import Producto  from "./pages/Sections/Producto.jsx";
import Store  from "./pages/Sections/Store.jsx";

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lubricantes/" element={<Lubricantes />} />
        <Route path="/Lenceria/" element={<Lubricantes />} />
        <Route path="/products/:id" element={<Producto />} />
        <Route path="/store/" element={<Store />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
