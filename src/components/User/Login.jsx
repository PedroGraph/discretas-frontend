import React from 'react';
import logo from "/assets/logo.svg";
import '../css/login.css'
import Auth from './Auth'

const Login = () => {
 
  return (
    <div className="login ">
    <div className='w-50 logo-login column'>
        <img src={logo} alt="" />
    </div>
    <div className='login-form-section column pt-5'>
     <Auth form={false}/>
    </div>
    </div>
  );
};

export default Login;
