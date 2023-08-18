import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';

async function showUniversities() {
    return await axios
      .get(`https://discretas-backend.onrender.com/json-uni/universidad`)
      .then((response) => {
        return(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

export const Slider = () => {

    const [universidades, setUniversidades] = useState([]);
    const { uid } = useParams();
  
    useEffect(() => {
  
      showUniversities().
      then((response) => {
        setUniversidades(response)
      }).
      catch((error) => {
        console.error(error);
      });
  
    }, [])
  
  
    return (
      <>
      <h2 style={{textAlign: "center", margin: "2rem"}}>Universidades que te pueden interesar</h2>
        <Carousel>
          {universidades.map((universidad) => (
            universidad._id !== uid &&(
                <Carousel.Item key={universidad._id} style={{height: "30em"} }>
                  <a href={`http://127.0.0.1:5173/universidades/${universidad._id}`}>
                          <img
                        className="d-block w-100"
                        src={universidad.imagen}
                        alt="Carousel Image 1"
                        style={{ background: 'rgba(0, 0, 0, 0.5)',}}
                      />
                    </a>
                 
                  <Carousel.Caption
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -30%)',
                      zIndex: 3,
                      color: '#fff',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div>
                      <h2>{universidad.nombre}</h2>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
          )))
          }
        </Carousel>
      </>
    );
  };