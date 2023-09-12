import React, {useEffect} from 'react';
import useProductContext from '../hooks/useProductContext';
import { Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import '../css/style_products.css';
import Payment from './Payment';
import Auth from '../User/Auth';
import store from '../../../image/store.png';

const UserInfo = ({product}) => {

  const {  
    isCompleteForm, 
    isLoadingForm, 
    modalPayment, setModalPayment,
    formData, setFormData,
    userLogged,
    canSubmit, 
    userInfo
  } = useProductContext();

  const productPurchased = Array.isArray(product) ? product : [product];

  useEffect(() => {
    userInfo().then((response) => {
      response.idt = '';
      setFormData(response)
    })
  },[])

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
      {
          userLogged.length === 0 ? (
            <>
              <div className='text-center mt-3'>
                Inicia sesión para realizar una compra :)
              </div>
              <div className='d-flex justify-content-center mt-3'>
                <Auth form={true}/>
              </div>
            </>
          ):(
            isLoadingForm ? (
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
              <div className='d-flex modal-payment justify-content-center'>
                <Col md={6} className='me-5 form-info'>
                  <div>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            className='mt-2'
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre(s)"
                            style={{border: !formData.name && userLogged.length > 0 ? '1px solid red' : ''}}
                            disabled={userLogged.length === 0 ? 'disabled' : ''}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            className='mt-2'
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Apellido(s)"
                            style={{border: !formData.last_name && userLogged.length > 0 ? '1px solid red' : ''}}
                            disabled={userLogged.length === 0 ? 'disabled' : ''}
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
                              name="idt"
                              value={formData.idt}
                              onChange={handleChange}
                              placeholder="Cedula"
                              style={{border: !formData.idt && userLogged.length > 0 ? '1px solid red' : ''}}
                              disabled={userLogged.length === 0 ? 'disabled' : ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Control
                              type="tel"
                              className='mt-2'
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Telefono"
                              style={{border: !formData.phone && userLogged.length > 0  ? '1px solid red' : ''}}
                              disabled={userLogged.length === 0 ? 'disabled' : ''}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group>
                        <Form.Control
                          type="email"
                          className='mt-2'
                          name="email"
                          placeholder="Correo electrónico"
                          value={formData.email}
                          onChange={handleChange}
                          style={{border: !formData.email && userLogged.length > 0 ? '1px solid red' : ''}}
                          disabled={userLogged.length === 0 ? 'disabled' : ''}
                          required
                        />
                      </Form.Group>
                      {!canSubmit && userLogged.length > 0 && <h6 className='text-danger text-center mt-2'>Todos los campos son obligatorios</h6>}
                  </div>
                </Col>
                  <Payment orderItems={productPurchased} userInfomation={formData}/>
              </div>
              
            )
          )
      }
      </Modal.Body>
    </Modal>
  );
};

export default UserInfo;
