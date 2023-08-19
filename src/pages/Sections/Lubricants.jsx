import React, {useState, useEffect} from "react";
import Navbar from '../../components/common/Navbar'
import Products from '../../components/ProductList/Products'
import {Login} from '../Sections/Login'
import Footer from '../../components/common/Footer'
import axios from 'axios'


const MainPage = () => {

  return (
    <>
      <Navbar/>
        <Products/>
      <Footer/>
    </>
  );
};

export default MainPage;
