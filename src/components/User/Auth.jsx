import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import { GoogleAuthProvider } from 'firebase/auth'
import underWear from "../../../image/underwear.png";
import lubricant from "../../../image/lubricant.png";
import google from "../../../image/google.svg";
import dsGif from '../../../image/logo-login.gif'

const Auth = ({form}) => {

    console.log(form)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { isLoading, setIsLoading, isComplete, setIsComplete, userLogged, setUserLogged, userDatabase } = useProductContext();
    const [loginError, setLoginError] = useState('');
    const [registerSection, setRegisterSection] = useState(false);
    const [isRegistered, setIsRegistered] = useState('');

    useEffect(() => {
        if (userLogged.length > 0)window.location.href="/";
    }, [userLogged])

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await firebaseConfig.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((response) => {
                    console.log(response)
                    const userId = response.user.uid;
                    setUserLogged(userId);
                    setTimeout(() => { window.location.href="/lubricantes/" }, 500);
                })
                .catch((err) => {
                    console.log(err)
                    if (err.message.includes("auth/wrong-password")) setLoginError("Usuario y/o contraseña incorrecta :(");
                    if (err.message.includes("auth/user-not-found")) setLoginError("La cuenta no está registrada");
                    else userDatabase(data);
                });

        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => { setIsLoading(false); }, 500)
        }
    };

    const onSubmitWithGoogle = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const googleProvider = new GoogleAuthProvider();
            await firebaseConfig.auth().signInWithPopup(googleProvider)
                .then((response) => {
                    const userId = response.user.uid;
                    setUserLogged(userId);
                    setTimeout(() => {
                        window.location.href="/lubricantes/"
                    }, 500);
                });

        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        }
    }

    const onSubmitRegister = async (data) => {
        setIsRegistered(false)
        setIsLoading(true)
        try {
            await firebaseConfig.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((response) => {
                    const userId = response.user.uid;
                    data.uid = userId;
                    userDatabase(data).then((response) => {
                        setUserLogged(userId);
                        setIsComplete(true);
                        setTimeout(() => {
                            setIsComplete(false);
                            window.location.href="/lubricantes/"
                        }, 2000)
                    })
                    .catch((error) => {
                        //Mandar este error a algún errors log
                    });
                })
                .catch((err) => {
                    if (err.message.includes("The email address is already")) setIsRegistered("El correo ya está registrado. Intenta con otro :)");
                });
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        !registerSection ? (
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                {
                    !form && (
                        <div className='logo-gif'>
                            <img src={dsGif} alt="" />
                        </div>
                    )
                }
                <div className="products">
                    <img src={underWear} alt="" />
                    <img src={lubricant} alt="" />
                </div>
                <div className="form-group">
                    <input type="email" placeholder='Correo' id="email" {...register('email', { required: true })} />
                    {errors.email && <span className="error-message">El correo es obligatorio</span>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder='Contraseña' id="password" {...register('password', { required: true })} />
                    {errors.password && <span className="error-message">La contraseña es obligatoria</span>}
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
                                <button type="submit" className='bg-black w-100'>Iniciar sesión con correo</button>
                            </div>
                            <div className='mt-2'>
                                <button className='bg-white text-black w-100' type="submit" onClick={onSubmitWithGoogle}>
                                     Iniciar sesión con <img src={google} alt="" style={{ width: "20px" }} />
                                </button>
                            </div>
                            <div className='mt-2'>
                                <button className='bg-black w-100' type="submit" onClick={() => {setRegisterSection(true)}}>
                                     Registrarse
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </form>
        ) : (
            <form className="register-form" onSubmit={handleSubmit(onSubmitRegister)}>
                <div className='logo-gif'>
                    <img src={dsGif} alt="" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Nombre(s)" id="name" {...register('name', { required: true })} />
                    {errors.name && <span className="error-message">El nombre es obligatorio</span>}
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Apellido(s)" id="last_name" {...register('last_name', { required: true })} />
                    {errors.name && <span className="error-message">El apellido es obligatorio</span>}
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Correo electrónico" id="email" {...register('email', { required: true })} />
                    {errors.name && <span className="error-message">El correo es obligatorio</span>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder='Contraseña' id="password" {...register('password', { required: true })} />
                    {errors.name && <span className="error-message">La contraseña es obligatoria</span>}
                </div>
                <div className='d-flex justify-content-center'>
                    {
                        isRegistered && <div className="text-danger"><p>{isRegistered}</p></div>
                    }
                    {isLoading ? (
                        <button type="submit"><Spinner animation="border" size="sm" /></button>
                    ) : isComplete ? (
                        <button type="submit" className='success'>✅</button>
                    ) : (
                        <>
                          <button type="submit" className='bg-black me-2' onClick={()=>{setRegisterSection(false)}}>Inicar Sesión</button> 
                          <button type="submit" >Registrarse</button>
                        </>
                    )}
                </div>
            </form>
        )

    )

}

export default Auth;