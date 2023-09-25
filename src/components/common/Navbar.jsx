import React, { useState, useEffect } from 'react';
import { SearchBar } from "./Search";
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import shoppingCart from '../../../image/shopping.svg'
import { Link } from 'react-router-dom';
import logo from "/assets/logo.svg";
import {MainLoader} from './Loader'
import '../css/navbar.css'

export default function Navbar() {
  const { orderList, userLogged, setUserLogged, hideFooter, isMobile } = useProductContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    function changeToggleStatus(event) {
      if (event.target.className === 'menu-button' || event.target.className.baseVal === 'user-info') {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
      } else {
        setMenuOpen(false);
      }
    }
  
    document.addEventListener('click', changeToggleStatus);

    return () => {
      document.removeEventListener('click', changeToggleStatus);
    };
  }, [userLogged]);
  

  const handleLogOut = () => {
    setLogOut(true);
    setTimeout(() => {
      firebaseConfig.auth().signOut();
      setUserLogged([]);
      setLogOut(false)
    }, 1000);
  }

  return (
    <>
    {logOut && (
      <div className='logout-loading'>
        <MainLoader />
      </div>
    )}
    <div className={hideFooter && isMobile <= 1364 ? 'd-none' : 'navbar-container'}>
    <div className='navbar-left'>
      <a href="/">
        <img className='logo' src={logo} alt='Logo'></img>
      </a>
      <SearchBar />
      <nav className='d-flex ms-5'>
        <div className='nav-links'>
          <a href="/lubricantes">Lubricantes</a>
        </div>
        <div className='nav-links'>
          <a href="/lenceria">Lencería</a>
        </div>
        <div className='nav-links'>
            <a href="/about">Sobre nosotros</a>
        </div>
      </nav>
    </div>
   
    <div className='navbar-right'>
    <a href="/store" className='cart-link'>
        <p className='cart-icon'><img src={shoppingCart} alt=""/>{orderList.length > 0 && <span className="cart-badge">{orderList.length}</span>}</p>
    </a>
    <div className='burger-menu-desktop'>
    {userLogged.length === 0 ? (
      <Link to="/login">
        <div className='menu-button-desktop'>
          <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
            <circle cx="12" cy="10" r="3"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
      </Link>
    ):(
      <div className='menu-button-desktop user-info'>
        <svg className='user-info' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path className='user-info' d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle className='user-info' cx="12" cy="10" r="3"/>
          <circle className='user-info' cx="12" cy="12" r="10"/>
        </svg>
      </div>
    )}
      
    <nav className={`nav-links-desktop ${menuOpen ? 'active' : ''}`}>
      <div className='log-buttons'>
        <div>
          <a href="/my-profile"><p>Ver Perfil</p></a>
          <a href="/wishlist"><p>Lista de deseos</p></a>
          <a href="/orders"><p>Mis Pedidos</p></a>
          <a onClick={handleLogOut}><p>Cerrar Sesión</p></a>
        </div>
      </div>
    </nav>
    </div>
    </div>
    <div className='burger-menu'>
      <button className='menu-button'>
            ☰
          </button>
          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="/my-profile">Ver Perfil</a>
            <a href="/wishlist">Lista de deseos</a>
            <a href="/orders">Mis Pedidos</a>
            <a href="/lubricantes">Lubricantes</a>
            <a href="/lenceria">Lencería</a>
            <a href="/about">Sobre nosotros</a>
            <a href="/wishlist">Lista de deseos</a>
            {userLogged.length > 0 && <a href="" onClick={handleLogOut}>Cerrar Sesión</a>}
            {userLogged.length === 0 && (
              <>
                <a href="/login">Iniciar Sesión</a>
              </>
            )}
            <div className='cart-link-container'>
              {orderList.length > 0 && 
                <span className="cart-badge">{orderList.length}</span>}
              <a href="/store" className='cart-link'>
                <p className='cart-icon'><img src={shoppingCart} alt=""/>
                </p>
              </a>
            </div>
           
          </nav>
      </div>
  </div>
  </>
  )
}
