import React, { useState, useEffect } from 'react';
import  SearchBar from "./Search";
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import shoppingCart from '../../../image/shopping.svg'
import { Link } from 'react-router-dom';
import logo from "/assets/logo.svg";
import logoMobile from "/assets/logo.webp";
import { MainLoader } from './Loader'
import '../css/navbar.css'

export default function Navbar() {
  const { orderList, userLogged, setUserLogged } = useProductContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [navOptions, setNavOptions] = useState('');

  useEffect(() => {
    function changeToggleStatus(event) {
      const { className, id } = event.target;
      const isMenuButtonOrUserInfo = className.baseVal === 'user-info' || className.includes('burger-icon');

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
    e.preventDefault();
    setMenuOpen(false);
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
      <div className="bg-black flex justify-between items-center w-full xs:px-2 lg:px-5">
        <div className='flex xs:justify-between lg:justify-start gap-4 items-center xs:w-[95%] lg:w-[85%] lg:me-4'>
          <a href="/">
            <img className='xs:h-[40px] lg:h-[60px]' src={logoMobile} alt='Logo' loading='lazy'></img>
          </a>
          <ul className='flex items-center w-full gap-4'>
            <li className='max-w-[600px] w-full'>
              <SearchBar />
            </li>
            <li className='text-white xs:hidden xs:text-[14px] xl:text-[16px] lg:block'>
              <a href="/productos">Todos los productos</a>
            </li>
            <li className='text-white xs:hidden xs:text-[14px] xl:text-[16px] lg:block'>
              <a href="/lubricante">Lubricantes</a>
            </li>
            <li className='text-white xs:hidden xs:text-[14px] xl:text-[16px] lg:block'>
              <a href="/lenceria">Lencería</a>
            </li>
            <li className='text-white xs:hidden xs:text-[14px] xl:text-[16px] lg:block'>
              <a href="/about">Sobre nosotros</a>
            </li>
          </ul>
        </div>
        <div className='xs:hidden lg:flex items-center justify-end xs:w-[5%] lg:w-[15%] gap-4'>
          <a href="/store" className='relative'>
            <p className='bg-white py-2 px-3 rounded'>
              <img src={shoppingCart} alt="" className='h-[30px]' loading='lazy'/>
              {orderList && orderList.length > 0 && <span className="absolute -top-3 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{orderList?.length}</span>}
            </p>
          </a>
          <div className=''>
            {userLogged.length === 0 ? (
              <Link to="/login">
                <div className='cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                    <circle cx="12" cy="10" r="3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
              </Link>
              ):(
              <div className='cursor-pointer'>
                <svg className='user-info' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path className='user-info' d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                  <circle className='user-info' cx="12" cy="10" r="3" />
                  <circle className='user-info' cx="12" cy="12" r="10" />
                </svg>
              </div>
            )}
            <nav className={`absolute top-[8%] right-0 bg-black ps-14 pe-6 py-6 w-1/4 z-[1000] rounded-b ${menuOpen ? 'block' : 'hidden'}`}>
              <ul className='flex flex-col items-end py-2 gap-3'>
                <a href="/orders"><li className='text-white hover:text-red-500'>Ordenes</li></a>
                <a href="/wishlist"><li className='text-white'>Lista de deseos</li></a>
                <a href="/my-profile"><li className='text-white'>Mi perfil</li></a>
                <a href="/"><li className='text-white' onClick={handleLogOut}>Cerrar sesión</li></a>
              </ul>
            </nav>
          </div>
        </div>
        <div className='burger-menu'>
          <button className='xs:block lg:hidden text-3xl burger-icon'>
            ☰
          </button>
          <nav className={`absolute top-[6%] flex flex-col items-end right-0 bg-black py-6 ps-14 pe-6 w-full z-[10000] ${menuOpen ? 'xs:flex lg:hidden' : 'xs:hidden lg:hidden'}`}>
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
            <a href="/about" className='pb-2 text-white'>Sobre nosotros</a>
            <a href="/wishlist" className='pb-2 text-white'>Lista de deseos</a>
            {userLogged.length > 0 && <a href="" className='pb-2 text-white' onClick={(e) => { handleLogOut(e) }}>Cerrar Sesión</a>}
            {userLogged.length === 0 && <a href="/login" className='pb-2'>Iniciar Sesión</a> }
            <div className='cart-link-container'>
              {orderList && orderList.length > 0 &&
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
