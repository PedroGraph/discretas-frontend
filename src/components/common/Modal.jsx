import React, {useEffect} from 'react';
import useProductContext from '../hooks/useProductContext';
import Auth from '../User/Login';
import Payform from './PayForm';
import logo from '../../../image/logo-login.gif';
import googleLogo from '../../../image/google.svg';
import { GetUserInfo, RegisterUser } from '../services/Auth';
import '../css/modal.css';


const InfoModal = ({show, styles}) => {

  const {  
    setModalPayment,
    userLogged,
    onSubmitWithGoogle,
  } = useProductContext();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setModalPayment(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleCloseModal = () => {
    setModalPayment(false);
  }

  const signUpAndLogin = async (e) => {
    e.preventDefault();
    const loginMethod = e.nativeEvent.submitter.value;
    console.log(loginMethod); 
    if(loginMethod === 'google'){
      const googleInfo = await onSubmitWithGoogle();
      const { displayName, email, phoneNumber, photoURL, uid } = googleInfo.auth.currentUser
      const userRegistered = await GetUserInfo(email);
      console.log(userRegistered);
      if(userRegistered.message === 'User not found'){
        const fullName = displayName.split(" ");
        const fields = {
          email: email,
          firstName: fullName[0],
          lastName: fullName[1].replace('“',""),
          photoUrl: photoURL,
          phoneNumber: phoneNumber,
          password: uid
        }
        const response = await RegisterUser(fields);
        if(!response.message) return;
        console.log(response);
      }
      return;
    }
  }

  return (
    <div className='info-modal xs:w-full xs:left-0 xs:top-0 xl:h-screen'>
        <div className=' d-flex items-center justify-center xs:block lg:hidden rounded-full absolute xs:top-3 xs:right-5 xl:right-[22%]  z-[1200] text-black text-center' onClick={handleCloseModal}> 
          <span className='font-bold xs:text-white text-lg xl:text-black'>x</span>
        </div>
        <div className='info-modal-form'>
          <div>
            {userLogged.length > 0 ? (
                <Payform product={show}/>
              ):(
              <div className='bg-black h-[700px] d-flex flex-col'> 
                <img src={logo} alt="logo" className="w-5/6 pt-2 mx-auto"/>
                <form onSubmit={signUpAndLogin}>
                  <div className='px-5 d-flex flex-col gap-4'>
                    <input type="email" className='w-full h-9 border' name='email' placeholder='Peter@discreta.com'/>
                    <input type="password" className='w-full h-9 border' name='password' placeholder='*********'/>
                  </div>
                  <div className='d-flex flex-col px-5 pt-4 gap-4'>
                    <button className='rounded' type="submit" name="loginMethod" value="login">Iniciar Sesion</button>
                    <div className='px-2 d-flex justify-between gap-2'>
                      <span className='border-1 w-2/4'></span>
                      <span></span>
                      <span className='border-1 w-2/4'></span>
                    </div>
                    <button className='rounded bg-white text-black d-flex gap-1 items-center justify-center' type="submit" name="loginMethod" value="google">
                      Iniciar Sesion con       
                      <img src={googleLogo} alt="logo-google" className='w-5'/>
                    </button>
                  </div>
                </form>
                <span className='text-white text-center px-5 pt-3'>¿No te has registrado?<a href="/signup" className='text-blue-400'> Registrarme </a></span>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default InfoModal;
