import { useState } from "react";
import React from 'react'
import logo from "/assets/logo.svg"
import {SearchBar} from "./Search";
import { Link } from 'react-scroll';

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container-fluid' style={{backgroundColor: "#000"}}>
      <div className='row w-90 mx-auto navbar'>
        <div className='col-12 d-flex align-items-center justify-content-between px-0 py-2 py-lg-4'>
        <a href="http://127.0.0.1:5173/">
          <img className='me-2 ' src={logo} width="80%" height="76px" alt='Logo'></img>
        </a>
        <SearchBar/>
        <div className="burger-menu">
          <button className={`burger-button ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            ☰
          </button>
          <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <div className="menu-options">
              <a href="/">Opción 1</a>
              <a href="/">Opción 2</a>
              <a href="/">Opción 3</a>
            </div>
          </div>
        </div>
        <div className="d-flex mt-4 options-navbar">
          <div style={{paddingLeft: "3em", marginLeft: "1em"}}> <p className="text-white"> <a href="/lubricantes" style={{textDecoration:"none", color: "white"}}>Lubricantes</a></p></div>
          <div style={{paddingLeft: "3em"}}> <p className="text-white"><a href="/lenceria" style={{textDecoration:"none", color: "white"}}>Lencería</a> </p></div>
          <div style={{paddingLeft: "3em"}}> <p className="text-white"> Sobre nosotros </p></div>
        </div>
          <div className='d-flex' >
            <a href="/store" style={{textDecoration: "none"}}>
              <p style={{ backgroundColor: "#FFF", cursor: "pointer"}} className='light-green mt-2 px-4 me-3 fw-bold py-2 mb-0 rounded roboto'>🛒
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
