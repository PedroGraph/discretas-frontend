
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import MainPage from "./pages/mainPage/MainPage.jsx";
import Lubricantes  from "./pages/Sections/Lubricants.jsx";
import Producto  from "./pages/Sections/Producto.jsx";
import Store  from "./pages/Sections/Store.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import PageNotFound from './pageNotFound/PageNotFound.jsx';
import Login from './components/User/Login.jsx';
import Profile from "./components/common/Profile/Profile.jsx";
import HTMLEditor from "./components/common/TestHtml.jsx";

function App() {
  return (
     <BrowserRouter>
     <Navbar/>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/lubricantes" element={<Lubricantes />} />
          <Route path="/Lenceria" element={<Lubricantes />} />
          <Route path="/lubricantes/:productId" element={<Producto />} />
          <Route path="/store" element={<Store />} />
          <Route path="/wishlist" element={<Store />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/my-profile" element={<Profile/>} />
          <Route path="/purchases" element={<Profile/>} />
          <Route path="/orders" element={<Profile/>} />
          <Route path="/settings" element={<Profile/>} />
          <Route path="/test" element={<HTMLEditor/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
