import React, { useState } from 'react';
import imgUniversidad from "../../images/universityBackground.jpg"
import Navbar from '../../components/common/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [info, setInfo] = useState('');
    const navigate = useNavigate();

    const handleNombreChange = (event) => {
      setNombre(event.target.value);
    };
  
    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleContrasenaChange = (event) => {
      setContrasena(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
        await axios
        .post(`https://discretas-backend.onrender.com/json-usr/newuser`,{
            usuario: nombre,
            email: email,
            pass: contrasena,
        })
        .then((response) => {
            console.log(response)
            setInfo("Registro exitoso. Será redirigido al inicio de sesión en unos segundos...")
            setTimeout(() => {
                navigate("/")
            }, 2000)
        })
        .catch((error) => {
            console.log(error);
        });
    };
  
    const styles = {
        container: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50em',
          backgroundImage:  `url(${imgUniversidad})`,
          backgroundSize: 'cover', /* Ajusta la imagen al tamaño del div */
          backgroundPosition: 'center' /* Centra la imagen dentro del div */
        },
        form: {
          display: 'flex',
          flexDirection: 'column',
          width: '30em',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
        },
        input: {
          marginBottom: '10px',
          padding: '5px',
          fontSize: '16px',
          width: "100%"
        },
        button: {
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        },
      };
    

    
      return (
        <>
            <Navbar/>
            <div style={styles.container}>
            <div>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
            <div>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleNombreChange}
                    style={styles.input}
                    placeholder='Usuario'
                />
                </div>
                <div>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    style={styles.input}
                    placeholder='Email'
                />
                </div>
                <div>
                <input
                    type="password"
                    id="password"
                    value={contrasena}
                    onChange={handleContrasenaChange}
                    style={styles.input}
                    placeholder='Contraseña'
                />
                </div>
                <button type="submit" style={styles.button}>
                Registrarse
                </button>
                <br/>
                {info ? <p style={{color: "red"}}> {info} </p>:""}
            </form>
            </div>
        </>
      );
  };