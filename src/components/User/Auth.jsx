import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import google from "../../../image/google.svg";
import facebook from "../../../image/facebook.svg";
import dsGif from '../../../image/logo-login.gif'
import {UpdateUserInfo} from '../services/Auth';
import Cookies from 'js-cookie';

const Auth = ({form}) => {

  const { 
      isLoading, setIsLoading, 
      isComplete, setIsComplete, 
      userLogged, setUserLogged,  
      onLogin, onSubmitWithGoogle,
      onSubmitWithFacebook, userDatabase,
      onSubmitRegister, validateData
  } = useProductContext();
  const [loginError, setLoginError] = useState('');
  const [registerSection, setRegisterSection] = useState(false);
  const [isRegistered, setIsRegistered] = useState('');
  const [formUser, setFormUser] = useState({
      name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      repeat_password: ''
  });


  useEffect(() => {
      if (userLogged.length > 0)window.location.href="/";
  },[userLogged]);

  const registerAndLogin = async (e, action) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      let user = null;
  
      if (action === 'Google') {
        const response = await onSubmitWithGoogle();
        user = response?.uid;
  
        const { accessToken, stsTokenManager, ...userInfo } = response.auth.currentUser;
        const updateResponse = await UpdateUserInfo(userInfo);
        if (updateResponse.error) {
          const fullName = userInfo.displayName.split(" ");
          const fields = {
            email: userInfo.email,
            name: fullName[0],
            last_name: fullName[1].replace('“', ""),
            uid: userInfo.uid,
            photourl: userInfo.photoURL,
          };
          const userDbResponse = await userDatabase(fields);
        }
        return;
      }
  
      if (action === 'Facebook') {
        await onSubmitWithFacebook();
        return;
      }
  
      if (action === 'login') {
        const response = await onLogin(formUser);
        user = response?.uid;
        if (response.message) return setLoginError("Usuario y/o contraseña no válido");
      }
  
      if (action === 'register') {
        const validation = validateData(formUser);
        if (validation.data) {
          setIsRegistered(null);
          const response = await onSubmitRegister(formUser);
          user = response?.uid;
          if (response.message) return setIsRegistered("El correo ya está registrado. Intenta con otro :)");
          else return setIsRegistered(validation.message);
        }
      }
      
      if (user) {
        Cookies.set('userLogged', user);
        setUserLogged(user);
      }
  
    } catch (err) {
      console.error("Error al iniciar sesión: " + err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const setInformation = (e) => {
    const { name, value } = e.target;
    setFormUser(prevFormUser => ({
      ...prevFormUser,
      [name]: value,
    }));
  };
  
  
  return (
    !registerSection ? (
      <form className="flex flex-column max-w-500 w-3/4 max-w-[450px]" onSubmit={(e)=>{registerAndLogin(e, "login")}}>
        <img src={dsGif} alt="" className='w-full xs:h-[200px] md:h-[300px] lg:h-[400px] xs:block lg:hidden'/>
        <input type="email" placeholder='usuario@tuemail.com' name="email" className='mt-2 rounded' onChange={(e)=>{setInformation(e)}} />
        <input type="password" placeholder='************' name="password" className='mt-2 rounded mb-4' onChange={(e)=>{setInformation(e)}} />
        {loginError && <div className="text-danger text-center my-2"><p>{loginError}</p></div>}
        {isLoading ? (
          <button type="submit" className='bg-black'><Spinner animation="border" size="sm" /></button>
        ):(
          <>
          <button type="submit" className='xs:bg-white xs:text-black rounded lg:bg-black lg:text-white w-100'>Iniciar sesión </button>
          <div className='or-section'>
              <div></div>
              <span>o</span>
              <div></div>
          </div>
          <button className='bg-white text-black w-100 flex gap-2 items-center justify-center py-3 rounded mb-2' type="submit" onClick={(e)=>{registerAndLogin(e, "Google")}}>
                Iniciar sesión con <img src={google} alt="google-img-logo" className='h-[20px]'/>
          </button>
          <button className='text-white w-100 flex gap-2 items-center justify-center py-3 rounded' type="submit" style={{backgroundColor:"#066CD2"}}onClick={(e)=>{registerAndLogin(e, "Facebook")}}>
                Iniciar sesión con <img src={facebook} alt="facebook-img-logo" className='h-[20px]'/>
          </button>
          <div className='mt-2 text-center flex justify-center gap-2'>
            <span className='xs:text-white lg:text-black'>¿No tienes cuenta?</span>
            <span className='text-primary' onClick={() => {setRegisterSection(true)}}> Registrate aquí</span>
          </div>
      </>
      )}
      </form>
    ):(
      <form className="flex flex-column max-w-500 w-3/4 max-w-[400px]" onSubmit={(e)=>{registerAndLogin(e, "register")}}>
            <img src={dsGif} alt="ds-image-logo" className='w-full xs:h-[200px] md:h-[300px] lg:h-[400px] xs:block lg:hidden'/>
            <input className='xs:m5mt-2 rounded' type="text" placeholder="Nombre(s)" name="name" onChange={(e)=>{setInformation(e)}} />
            <input className='mt-2 rounded' type="text" placeholder="Apellido(s)" name="last_name" onChange={(e)=>{setInformation(e)}} />
            <input className='mt-2 rounded' type="email" placeholder="Correo electrónico" name="email" onChange={(e)=>{setInformation(e)}} />
            <input className='mt-2 rounded' type="phone" placeholder="Teléfono (opcional)" name="phone" onChange={(e)=>{setInformation(e)}} />
            <input className='mt-2 rounded' type="password" placeholder='Contraseña' name="password"  onChange={(e)=>{setInformation(e)}} />
            <input className='mt-2 rounded' type="password" placeholder='Confirmar contraseña' name="repeat_password" onChange={(e)=>{setInformation(e)}} />

            {isRegistered && <div className="text-danger text-center"><p>{isRegistered}</p></div>}

            {isLoading ? (
              <button type="submit"><Spinner animation="border" size="sm" /></button>
            ) : isComplete ? (
              <button type="submit" className='success'>✅</button>
            ) : (
              <button type="submit" className='xs:bg-white xs:text-black rounded lg:bg-black lg:text-white mt-4' style={{padding: "1em"}}>Registrarse</button>
            )}
            
            <span className='xs:text-white xs:text-center lg:text-start lg:text-black my-4'>¿Ya tienes una cuenta? Inicia sesión <ins onClick={()=>{setRegisterSection(false)}}><strong>aquí</strong></ins></span>
        </form>
    )
  )

}

export default Auth;