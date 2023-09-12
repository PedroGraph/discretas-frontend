import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { SearchBar } from "./Search";
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import shoppingCart from '../../../image/shopping.svg'
import { Link } from 'react-router-dom';
import logo from "/assets/logo.svg";

export default function Navbar() {
  const { orderList, userLogged, setUserLogged, hideFooter, isMobile } = useProductContext();
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(()=>{
    function changeToggleStatus(event){
      if(event.target.className==='menu-button' || event.target.className==='menu-button-desktop') {
        setMenuOpen(!menuOpen);
        }
      else {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', changeToggleStatus);
  },[orderList, menuOpen, hideFooter, isMobile])

  const handleLogOut = () => {
    firebaseConfig.auth().signOut();
    setUserLogged([]);
  }

  return (
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
        <div className='nav-links'>
            <a href="/wishlist">Lista de deseos</a>
        </div>
      </nav>
    </div>
   
    <div className='navbar-right'>
    <div className='burger-menu-desktop'>
      <button className='menu-button-desktop'>
            ☰
          </button>
          <nav className={`nav-links-desktop ${menuOpen ? 'active' : ''}`}>
          <div className='log-buttons'>
            {userLogged.length > 0 && (
              <div className='me-3 mb-3'>
                <a href="" className='me-5' onClick={handleLogOut}><Button>Cerrar Sesión</Button></a>
              </div>
            )}
            {userLogged.length === 0 && (
              <>
                <div className='me-3 mt-3 mb-3'>
                  <Link to="/login"><Button>Iniciar Sesión</Button></Link>
                </div>
              </> 
            )}
            </div>
          </nav>
    </div>
      <a href="/store" className='cart-link'>
        <p className='cart-icon'><img src={shoppingCart} alt=""/>{orderList.length > 0 && <span className="cart-badge">{orderList.length}</span>}</p>
      </a>
    </div>
    <div className='burger-menu'>
      <button className='menu-button'>
            ☰
          </button>
          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
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
  )
}
