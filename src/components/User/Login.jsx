import React from 'react';
import backgroundLogin1 from '../../images/image-login.jpg';
import backgroundLogin2 from '../../images/imagen-login-2.jpg';
import backgroundLogin3 from '../../images/imagen-login-3.jpg';
import backgroundLogin4 from '../../images/imagen-login-4.jpg';
import backgroundLogin5 from '../../images/imagen-login-5.jpg';
import logo from '/assets/logo.svg';
import {DsLogo}from '../../images/logo'
import '../css/login.css'
import Auth from './Auth'

const Login = () => {

  const background = [
    backgroundLogin1,
    backgroundLogin2,
    backgroundLogin3,
    backgroundLogin4,
    backgroundLogin5
  ]

  const image = Math.floor(Math.random() * 5) ;

  return (
    <div className="login ">
    <div className='w-50 logo-login column' >
        <img src={background[image]} alt="login image background"/>
        <DsLogo/>
    </div>
    <div className='login-form-section column pt-5' >
     <Auth form={false}/>
    </div>
    </div>
  );
};

export default Login;
