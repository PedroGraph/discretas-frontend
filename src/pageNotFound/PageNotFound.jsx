import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './NotFound.css'; // Asegúrate de tener un archivo CSS para estilos personalizados
import underWear from '../../image/underwear.png'
import lubricant from '../../image/lubricant.png'

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <Row className="justify-content-center align-items-center">
        <Col>
          <div className="not-found-content text-center">
            <h1>Oops! Página no encontrada</h1>
            <p>La página que estás buscando no existe.</p>
            <Button href="/" variant="primary">Volver a la página de inicio</Button>
          </div>
        </Col>
      </Row>
      <div className="plane">
        <img src={underWear} alt="" />
        <img src={lubricant} alt="" />
      </div>
    </Container>
  );
};

export default NotFound;
