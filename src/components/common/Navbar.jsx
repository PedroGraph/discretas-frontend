import React, { useState } from 'react';
import logo from "/assets/logo.svg";
import { SearchBar } from "./Search";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar-container'>
    <div className='navbar-left'>
      <a href="/">
        <img className='logo' src={logo} alt='Logo'></img>
      </a>
      <SearchBar />
      <nav className='d-flex'>
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
        <p className='cart-icon'>🛒</p>
      </a>
    </div>
    <div className='burger-menu'>
      <button className='menu-button' onClick={toggleMenu}>
            ☰
          </button>
          <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href="/lubricantes">Lubricantes</a>
            <a href="/lenceria">Lencería</a>
            <a href="/about">Sobre nosotros</a>
            <a href="/store" className='cart-link'>
              <p className='cart-icon'>🛒</p>
            </a>
          </nav>
      </div>
  </div>
  )
}
