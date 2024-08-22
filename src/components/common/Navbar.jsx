import React, { useState, useEffect } from 'react';
import { SearchBar } from "./Search";
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import shoppingCart from '../../../image/shopping.svg'
import { Link } from 'react-router-dom';
import logo from "/assets/logo.svg";
import logoMobile from "/assets/logo.webp";
import { MainLoader } from './Loader'
import '../css/navbar.css'

export default function Navbar() {
  const { orderList, userLogged, setUserLogged, hideFooter, isMobile } = useProductContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [navOptions, setNavOptions] = useState('');

  useEffect(() => {
    function changeToggleStatus(event) {
      const { className, id } = event.target;
      const isMenuButtonOrUserInfo = className === 'menu-button' || className.baseVal === 'user-info';

      if (isMenuButtonOrUserInfo) {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
      } else if (id !== 'options') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('click', changeToggleStatus);

    return () => {
      document.removeEventListener('click', changeToggleStatus);
    };

  }, [userLogged]);


  const handleOpenOptions = (option) => {
    if (option === navOptions) setNavOptions('');
    else setNavOptions(option);
  }

  const handleLogOut = (e) => {
    e.preventDefault()
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
            <img className='logo' src={logoMobile} alt='Logo'></img>
          </a>
          <nav className='nav-options d-flex ms-5'>
            <div className='nav-links'>
              <a href="/lubricante">Lubricantes</a>
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
            <p className='cart-icon'><img src={shoppingCart} alt="" />{orderList.length > 0 && <span className="cart-badge">{orderList.length}</span>}</p>
          </a>
          <div className='burger-menu-desktop'>
            {userLogged.length === 0 ? (
              <Link to="/login">
                <div className='menu-button-desktop'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div className='menu-button-desktop user-info'>
                <svg className='user-info' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path className='user-info' d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                  <circle className='user-info' cx="12" cy="10" r="3" />
                  <circle className='user-info' cx="12" cy="12" r="10" />
                </svg>
              </div>
            )}

            <nav className={`nav-links-desktop ${menuOpen ? 'active' : ''}`}>
              <div className='log-buttons'>
                <div>
                  <a href="/my-profile"><p>Ver Perfil</p></a>
                  <a href="/wishlist"><p>Lista de deseos</p></a>
                  <a href="/orders"><p>Mis Pedidos</p></a>
                  <a onClick={(e) => { handleLogOut(e) }}><p>Cerrar Sesión</p></a>
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
            <div className="label-option pb-2" >
              <label htmlFor="" id="options" onClick={() => { handleOpenOptions('profile') }} className={`${navOptions === 'profile' ? 'text-center w-100' : ''}`}>Perfil</label>
              <div className={`options menu-slide-down bg-gray-300 p-2 rounded ${navOptions === 'profile' ? 'open-option' : 'd-none'}`}>
                <a href="/my-profile" className='text-black font-bold'>Ver Perfil</a>
                <a href="/wishlist" className='text-black font-bold'>Lista de deseos</a>
                <a href="/orders" className='text-black font-bold'>Mis Pedidos</a>
              </div>
            </div>
            <div className="label-option pb-2">
              <label htmlFor="" id="options" onClick={() => { handleOpenOptions('products') }} className={`${navOptions === 'products' ? 'text-center w-100' : ''}`}>Productos</label>
              <div className={`options menu-slide-down bg-gray-300 p-2 rounded ${navOptions === 'products' ? 'open-option' : 'd-none'}`}>
                <a href="/lubricante" className='text-black font-bold'>Lubricantes</a>
                <a href="/lenceria" className='text-black font-bold'>Lencería</a>
              </div>
            </div>
            <a href="/about" className='pb-2'>Sobre nosotros</a>
            <a href="/wishlist" className='pb-2'>Lista de deseos</a>
            {userLogged.length > 0 && <a href="" className='pb-2' onClick={(e) => { handleLogOut(e) }}>Cerrar Sesión</a>}
            {userLogged.length === 0 && (
              <>
                <a href="/login" className='pb-2'>Iniciar Sesión</a>
              </>
            )}
            <div className='cart-link-container'>
              {orderList.length > 0 &&
                <span className="cart-badge">{orderList.length}</span>}
              <a href="/store" className='cart-link'>
                <p className='cart-icon'><img src={shoppingCart} alt="" />
                </p>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
