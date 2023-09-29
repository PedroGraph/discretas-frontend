import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import underWear from "../../../image/underwear.png";
import lubricant from "../../../image/lubricant.png";
import google from "../../../image/google.svg";
import facebook from "../../../image/facebook.svg";
import dsGif from '../../../image/logo-login.gif'
import UpdateUserInfo from '../services/Auth';

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
        try{
          setIsLoading(true);
          e.preventDefault();
          let user = null;
          if(action==='Google'){
            onSubmitWithGoogle().then(response => {
              user = response?.uid;
              const { accessToken, stsTokenManager, ...userInfo } = response.auth.currentUser 
              UpdateUserInfo(userInfo).then(response => {
                if(response.error){
                  const fullName = userInfo.displayName.split(" ");
                  const fields = {
                    email: userInfo.email,
                    name: fullName[0],
                    last_name: fullName[1].replace('“',""),
                    uid: userInfo.uid,
                    photourl: userInfo.photoURL,
                  }
                  userDatabase(fields).then(response => {
                    console.log(response);
                  })
                }
              });
            });
            return;
          } 

          if(action==='Facebook'){
            onSubmitWithFacebook();
            return;
          } 

          if(action==='login'){
            onLogin(formUser).then(response =>{
                user = response?.uid;
                if (response.message) {
                  setLoginError("Usuario y/o contraseña no válido");
                  return;
                }
            })
          }

          if(action==='register'){
            const validation = validateData(formUser);
            if(validation.data){
              setIsRegistered(null);
              onSubmitRegister(formUser).then(response =>{
                user = response?.uid;
                if (response.message) {
                    setIsRegistered("El correo ya está registrado. Intenta con otro :)");
                    return;
                }
              })
            }else{
                setIsRegistered(validation.message)
                return;
            }
          }

          if(user) setUserLogged(user);

        }catch(err){
            console.error("Error al iniciar sesión: " + err);
        }finally{
            setIsLoading(false);
        }
      
    }

    const setInformation = (e) => {
        const {name, value} = e.target;
        setFormUser(prevFormUser => ({
            ...prevFormUser,
            [name]: value, 
          }));
    };


    return (
        !registerSection ? (
            <form className="login-form" onSubmit={(e)=>{registerAndLogin(e, "login")}}>
                {
                  !form && (
                    <div>
                      <div className='home-login d-none' onClick={(e)=>{ window.location.href="/" }}>
                        <svg viewBox="0 0 21 21" width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                          <g fill="#fff" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 1)">
                            <path d="m.5 9.5 9-9 9 9"/><path d="m2.5 7.5v8c0 .5522847.44771525 1 1 1h3c.55228475 0 1-.4477153 1-1v-4c0-.5522847.44771525-1 1-1h2c.5522847 0 1 .4477153 1 1v4c0 .5522847.4477153 1 1 1h3c.5522847 0 1-.4477153 1-1v-8"/>
                          </g>
                        </svg>
                      </div>
                      <div className='logo-gif'>
                        <img src={dsGif} alt="" />
                      </div>
                   </div>
                  )
                }
                <div className="products">
                    <img src={underWear} alt="" />
                    <img src={lubricant} alt="" />
                </div>
                <div className="form-group">
                    <input type="email" placeholder='usuario@tuemail.com' name="email" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder='************' name="password" onChange={(e)=>{setInformation(e)}} />
                </div>
                {
                    loginError && <div className="text-danger text-center m-2"><p>{loginError}</p></div>
                }
                <div className='login-button'>
                    {isLoading ? (
                        <button type="submit" className='bg-black'><Spinner animation="border" size="sm" /></button>
                    ) : (
                        <>
                            <div className='mt-2'>
                                <button type="submit" className='bg-black w-100'>Iniciar sesión </button>
                            </div>
                            <div className='or-section'>
                                <div></div>
                                <span>o</span>
                                <div></div>
                            </div>
                            <div className='mt-2'>
                                <button className='bg-white text-black w-100' type="submit" onClick={(e)=>{registerAndLogin(e, "Google")}}>
                                     Iniciar sesión con <img src={google} alt="" style={{ width: "20px" }} />
                                </button>
                            </div>
                            <div className='mt-2'>
                                <button className='text-white w-100' type="submit" style={{backgroundColor:"#066CD2"}}onClick={(e)=>{registerAndLogin(e, "Facebook")}}>
                                     Iniciar sesión con <img src={facebook} alt="" style={{ width: "20px" }} />
                                </button>
                            </div>
                            <div className='mt-2 text-center'>
                              <span>¿No tienes cuenta? 
                                <span className='register-here' onClick={() => {setRegisterSection(true)}}> Registrate aquí
                                </span>
                              </span>
                            </div>
                        </>
                    )}
                </div>
            </form>
        ) : (
            <form className="register-form"onSubmit={(e)=>{registerAndLogin(e, "register")}}>
                {!form && (
                    <div className='logo-gif'>
                        <img src={dsGif} alt="" />
                    </div>
                )}
                <div className="form-group">
                    <input type="text" placeholder="Nombre(s)" name="name" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Apellido(s)" name="last_name" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Correo electrónico" name="email" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="phone" placeholder="Teléfono (opcional)" name="phone" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder='Contraseña' name="password"  onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder='Confirmar contraseña' name="repeat_password" onChange={(e)=>{setInformation(e)}} />
                </div>
                <div className='d-flex justify-content-center flex-column submit-register'>
                    {
                        isRegistered && <div className="text-danger text-center"><p>{isRegistered}</p></div>
                    }
                    {isLoading ? (
                        <button type="submit"><Spinner animation="border" size="sm" /></button>
                    ) : isComplete ? (
                        <button type="submit" className='success'>✅</button>
                    ) : (
                        <>
                          
                          <button type="submit" className='register-button' style={{padding: "1em"}}>Registrarse</button>
                        </>
                    )}
                </div>
                <div className='mt-3'>
                    <span>¿Ya tienes una cuenta? Inicia sesión <ins onClick={()=>{setRegisterSection(false)}}><strong>aquí</strong></ins></span>
                </div>
            </form>
        )

    )

}

export default Auth;