import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from "/assets/logo.svg"
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';


const Footer = () => {

  const { hideFooter, isMobile } = useProductContext();
 
  useEffect(() => {

  },[hideFooter, isMobile]);

    const style = {
        height: "5em",
    }

  return (
    <footer className={hideFooter && isMobile <= 1364 ? 'd-none' : 'text-white py-5'} style={{backgroundColor: "#000", position: "relative", zIndex: "2", width: "100%"}}>
      <Container style={{margin: "0 !important"}}>
        <Row>
          <Col >
            {/* Logo de la empresa */}
            <img style={style} src={logo} alt="Logo de la empresa" />
            <Col className=" d-none" style={{marginLeft: "1em"}}>
                <a href="https://www.facebook.com/profile.php?id=100092280625219" target="_blank"  style={{marginRight: "1em"}}><FaFacebook size={30} color="white" /></a>
                <a href="https://www.instagram.com/discretaseduccionbga" target="_blank"  style={{marginRight: "1em", textDecoration: "none"}}> <BsInstagram  size={30} color="white" /> </a>
                <a href="https://www.tiktok.com/@discretaseduccionbga" target="_blank" > <FaTiktok size={30} color="white" /></a>
            </Col>
          </Col>
          <Col md={7}>
            {/* Suscripción al newsletter */}
            <h6>¿Quieres recibir actualizaciones de nuestros productos?</h6>
            <Form className="mt-3">
              <Form.Group controlId="newsletterEmail">
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" className='w-50'/>
              </Form.Group>
              <Button className="mt-3"  variant="primary" type="submit">Suscribirse</Button>
            </Form>
          </Col>
        </Row>
        <hr />
        {/* Información de la empresa */}
        <Row>
          <Col md={3}>
            <p>Derechos de autor © {new Date().getFullYear()} Discreta Seducción</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;