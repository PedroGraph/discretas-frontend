import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar'
import { CommentComponent } from './Comments';
import  {CommentForm} from './CreateComment';
import "./FailPageEarly.css";
import axios from 'axios';

export const University = (props) => {
  
  const { uid } = useParams();

  useEffect(() => {
    aboutUniversity(uid);
  }, []);

  const [info, setInfo] = useState({});

  async function aboutUniversity(universityId) {
     await axios.post(`https://discretas-backend.onrender.com/json-uni/universidad`,{
          universityId: universityId
        })
        .then((response) => {
          setInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
    });
  };

  return (
    <div style={{ display: 'flex' }}>
    {/* Columna de la izquierda */}
    <div className='universidad'>
      <img
        src={info.imagen}
        alt="Imagen"
        style={{ width: '70%', height: '100%', borderRadius: '5%' }}
      />
    </div>

    {/* Columna de la derecha */}
    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{width: "90%", color: "white"}}> {info.nombre} </h1>
      <h5 style={{width: "90%", color: "white"}}> {info.descripcion} </h5>
    </div>
  </div>
  );
};


export const Universidades = () => {
  return (
    <>
      <University></University>
      <CommentForm/>
      <CommentComponent/>
      {/* <CardsSection about={about} cards={cards}></CardsSection>] */}
    </>
  );
};


