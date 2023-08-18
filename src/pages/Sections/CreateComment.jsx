import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const CommentForm = () => {

  const [comment, setComment] = useState('');
  const [usuario, setUsuario] = useState('');

  const { uid } = useParams();

  useEffect(() =>{
    if(localStorage.getItem('user')){
      setUsuario(localStorage.getItem('user'));
    }
  }, [])

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('${__BACKEND_URL__}json-com/comentarios/createcomemnt',{
        comment: comment,
        user: usuario,
        universityId: uid
        })
        .then((response) => {
            setComment(response.data);
        })
        .catch((error) => {
            console.log(error);
    });
    console.log('Comentario enviado:', comment);
    setComment('');
  };

  return (
    <div
      style={{
        display: 'flex',
        width: "100%",
        margin: "3em 0 3em 9em"
      }}
    >
      <div style={{ width: '90%', height: '90%', borderRadius: '5%' }}> 
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={handleInputChange}
          style={{
            borderRadius: '10px',
            padding: '10px',
            width: '38em',
            resize: 'none',
            marginTop: "1em"
          }}
          placeholder="Escribe tu comentario aquí..."
        ></textarea>
        <br />
        <button
          type="submit"
          style={{
            borderRadius: '10px',
            padding: '8px 16px',
            background: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Enviar comentario
        </button>
      </form>
      </div>
      <div></div>
    </div>
  );
};
