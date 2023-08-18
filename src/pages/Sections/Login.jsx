import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imgUniversidad from "../../images/universityBackground.jpg"

export const Login = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(email === "" || password === ""){
        setError({info: "Todos los campos son obligatorios"})
        return
    }

    setError({})

    await axios
        .post(`https://discretas-backend.onrender.com/json-usr/usuario`,{
            user: email,
            pass: password,
        })
        .then((response) => {
            if(response.data.info) {
                setError(response.data)
                return 
            }
            localStorage.setItem('user', response.data[0].usuario);
            setUser([response.data[0].usuario])
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

  console.log(error)

  return (
    <div style={styles.container}>
      <div>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
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
            value={password}
            onChange={handlePasswordChange}
            style={styles.input}
            placeholder='Contraseña'
          />
        </div>
        <button type="submit" style={styles.button}>
          Iniciar sesión
        </button>
        <br/>
        {Object.keys(error).length > 0 ?<p style={{color: "red"}}>{error.info}</p> : ""}
      </form>
    </div>
  );
};


