import React, {useState, useEffect} from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import MainLenceria from "./MainImage";
import MostSold from "./Carrusel";
import Footer from "./Footer";

export default function University() {

  const [cartas, setcartas] = useState([]);

  useEffect(() => {
    showUniversities()
  }, [])
  
  async function showUniversities() {
    await axios
      .get(`http://https://discretas-backend.onrender.com/json-uni/universidad`)
      .then((response) => {
        setcartas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  // setInterval(function() {
  //   showUniversities();
  // }, 2000);

    const renderCards = () => {
      return cartas.map((card, index) => (
        <Col className="my-3" key={index} md={4}>
          <a href={"universidades/" + card._id} style={{ textDecoration: "none" }}>
            <Card style={{ width: '23rem', backgroundColor: "#B09DED" }}>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img variant="top" style={{ objectFit: 'cover', height: '100%' }} src={card.imagen} />
              </div>
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", textAlign: "center" }}>{card.nombre}</Card.Title>
                <Card.Text style={{ height: '70px', overflow: 'hidden', textAlign: "center" }}>{card.descripcion.slice(0, 110)}...</Card.Text>
              </Card.Body>
            </Card>
          </a>
        </Col>
      ));
    };

      return (
        
        <div>
          <MainLenceria/>
          {/* <MostSold/> */}
          <Footer/>
        </div>
    
      );
}
