import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import firebaseConfig from '../../../firebase.js';
import '../css/register.css'; 

const Register = () => {
  console.log()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const {isLoading, setIsLoading, isComplete, setIsComplete, userLogged, setUserLogged} = useProductContext();
  const [userRegistered, setUserRegistered] = useState(false);

  useEffect(()=>{
    if(userLogged.length > 0) window.location.href="/";
  },[userLogged])

  const verifyPassword = (e) =>{

  }

  const onSubmit = async (data) => {
    setUserRegistered(false)
    setIsLoading(true)
    try {
      await firebaseConfig.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        const userId=response.user.uid;
        setUserLogged(userId);
        setIsComplete(true);
        setTimeout(() => {
          setIsComplete(false);
          window.location.href="/lubricantes/"
        }, 2000)
      })
      .catch((err) => {
        if(err.message.includes("The email address is already")) setUserRegistered("El correo ya está registrado. Intenta con otro :)");
      });
      
    } catch (error) {
        console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register mb-4 mt-5 p-5">
      <h1>Registrarse</h1>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input type="text" id="name" {...register('name', { required: true })} />
          {errors.name && <span className="error-message">El nombre es obligatorio</span>}
        </div>
        <div className="form-group">
          <input type="text" id="last_name" {...register('last_name', { required: true })} />
          {errors.last_name && <span className="error-message">El nombre es obligatorio</span>}
        </div>
        <div className="form-group">
          <input type="email" id="email" {...register('email', { required: true })} />
          {errors.email && <span className="error-message">El correo es obligatorio</span>}
        </div>
        <div className="form-group">
          <input type="password" id="password" {...register('password', { required: true })} />
          {errors.password && <span className="error-message">La contraseña es obligatoria</span>}
        </div>
        <div className="form-group">
          <input type="password" id="same_password" />
          {errors.name && <span className="error-message">La contraseña es obligatoria</span>}
        </div>
        {
          userRegistered && <div className="text-danger"><p>{userRegistered}</p></div>
        }
        { isLoading ? (
          <button type="submit"><Spinner animation="border" size="sm" /></button>
        ): isComplete ? (
          <button type="submit" className='success'>✅</button>
        ):(
          <button type="submit">Registrarse</button>
        )}
      </form>
    </div>
  );
};

export default Register;
