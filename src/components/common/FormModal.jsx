import React, { useState } from 'react';
 import useProductContext from '../hooks/useProductContext';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import '../css/style_products.css';
import Payment from './Payment'
import store from '../../../image/store.png';

const UserInfo = ({product}) => {

  const {  
    isCompleteForm, 
    isLoadingForm, 
    modalPayment, setModalPayment,
    formData, setFormData,
    canSubmit
  } = useProductContext();

  const productPurchased = Array.isArray(product) ? product : [product];

  const handleCloseModal = () => {
    setModalPayment(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
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
            <img src={store} alt=""  className='store-image'/>
            <h3>Tu compra se ha procesado exitosamente.</h3>
            <h6>Te vamos a redirigir a nuestro whatsapp {':)'}</h6>
          </div>
        ) : (
          <div className='d-flex modal-payment'>
            <Col md={6} className='me-5 form-info'>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        className='mt-2'
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre(s)"
                        style={{border: !formData.nombre ? '1px solid red' : ''}}
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
                        placeholder="Apellido(s)"
                        style={{border: !formData.apellido ? '1px solid red' : ''}}
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
                          placeholder="Cedula"
                          style={{border: !formData.cedula ? '1px solid red' : ''}}
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
                          placeholder="Telefono"
                          style={{border: !formData.telefono ? '1px solid red' : ''}}
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
                      placeholder="Correo electrónico"
                      value={formData.correo}
                      onChange={handleChange}
                      style={{border: !formData.correo ? '1px solid red' : ''}}
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
