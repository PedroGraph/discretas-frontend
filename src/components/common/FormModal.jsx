import React, { useState } from 'react';
 import useProductContext from '../hooks/useProductContext';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import '../css/style_products.css';
import Payment from './Payment'
import store from '../../../image/store.png';

const UserInfo = ({product}) => {

  const {  
    isCompleteForm, setIsCompleteForm, 
    isLoadingForm, setIsLoadingForm,
    modalPayment, setModalPayment,
    formData, setFormData,
    canSubmit
  } = useProductContext();

  const productPurchased = Array.isArray(product) ? product : [product];

  const handleCloseModal = () =>{
    setModalPayment(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadingForm(true);
    setTimeout(() => {
      setIsLoadingForm(false);
      setIsCompleteForm(true);
      setTimeout(() => {
        setModalPayment(false);
        setIsCompleteForm(false);
      }, 3000);
    }, 1000);
  };

  console.log(productPurchased)

  return (
    <Modal show={modalPayment} onHide={handleCloseModal} centered animation={true}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {isLoadingForm ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : isCompleteForm ? (
          <div className="text-center">
            <img src={store} alt="" />
            <h3>Tu compra se ha procesado exitosamente.</h3>
            <h6>Te vamos a redirigir a nuestro whatsapp {':)'}</h6>
          </div>
        ) : (
          <div className='d-flex modal-payment'>
            <Col md={6} className='me-5 form-info'>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        className='mt-2'
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeHolder="Nombre(s)"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        className='mt-2'
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeHolder="Apellido(s)"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          className='mt-2'
                          name="cedula"
                          value={formData.cedula}
                          onChange={handleChange}
                          placeHolder="Cedula"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="tel"
                          className='mt-2'
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeHolder="Telefono"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      className='mt-2'
                      name="correo"
                      placeHolder="Correo electrónico"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {!canSubmit && <h6 className='text-danger text-center mt-2'>Todos los campos son obligatorios</h6>}
              </Form>
            </Col>
            <div className='mt-5'>
              <Payment orderItems={productPurchased} userInfomation={formData}/>
            </div>
          </div>
          
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UserInfo;
