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

  const image = Math.floor(Math.random() * background.length) ;

  return (
    <div className="xs:grid xs:h-screen lg:h-[50vh] lg:flex ">
      <div className='relative xs:hidden lg:block w-2/6'>
          <img src={background[image]} alt="login_image_background" className='xs:hidden lg:block lg:w-full lg:h-[100vh] xl:h-[91.3vh] lg:object-cover'/>
          <div className='absolute bottom-10 left-2 z-[10000] xs:block lg:hidden'><DsLogo/></div>
      </div>
      <div className='flex flex-col justify-center items-center xs:bg-black lg:bg-gray-200 lg:w-4/6 lg:h-[100vh] xl:h-[91.3vh]'>
        <Auth form={false}/>
      </div>
    </div>
  );
};

export default Login;
