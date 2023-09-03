import React, {useState} from 'react';
import useProductContext from '../hooks/useProductContext';
import { Button, Modal, Spinner, Form } from 'react-bootstrap';
import ProductList from './ProductList';
import FilterParams from './FilterParams';
import Filter from '../../../image/filtrar.png'
import '../css/style_products.css';

const Products = () => {
  
  const {
    products,
    sortType, setSortType,
    lowestPriceProduct,
    highestPriceProduct, 
    handleFilter,
  } = useProductContext();

  const [menuOpen, setMenuOpen] = useState(false);

   const handleClose = () => setMenuOpen(false);
   const handleShow = () => setMenuOpen(true);
 

  return (
    <div className='p-4 product-list-container'>
      <div className='d-flex'>
        <div className='p-5 filter-params'>
          {!highestPriceProduct && !lowestPriceProduct ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <FilterParams onFilter={handleFilter} lower={lowestPriceProduct} higher={highestPriceProduct} />
          )}
        </div>
        <div
          className='p-5 product-list'
        >
          <div 
            className='d-flex align-items-center mt-2 me-5 product-list-filter' 
            style={{ justifyContent: 'flex-end' }}
            >
            <div className='button-filter'>
              <Button onClick={handleShow}  disabled={!highestPriceProduct && !lowestPriceProduct ? 'disabled' : ''}>
                <img src={Filter} alt="" />
              </Button>
            </div>
            <div>
              <Modal show={menuOpen} onHide={handleClose} centered animation={true} style={{left: "12%"}}>
                <Modal.Header closeButton>
                  <Modal.Title>Filtros</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <FilterParams onFilter={handleFilter} lower={lowestPriceProduct} higher={highestPriceProduct} />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <span className='mr-2 order-by'>Ordenar por: </span>
            <select 
              className='form-control' 
              style={{'display': 'flex', width: '10em', marginLeft: '1em'}} 
              value={sortType} 
              onChange={(e) => setSortType(e.target.value)}
              disabled={!highestPriceProduct && !lowestPriceProduct ? 'disabled' : ''}
              >
              <option value='asc'>Nombre A-Z</option>
              <option value='desc'>Nombre Z-A</option>
              <option value='priceAsc'>Menor Precio</option>
              <option value='priceDesc'>Mayor Precio</option>
              <option value='starsHigh'>Mayor Valoración</option>
              <option value='starsLow'>Menor Valoración</option>
            </select>
          </div>
          {
            !highestPriceProduct && !lowestPriceProduct ? (
              <Spinner animation='border' size='sm' style={{marginTop: "15em", marginLeft: "12em", width: '4rem', height: '4rem', position: "absolute", top: "0%", left: "40%"}}/>
            ):(
              <ProductList products={products} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Products;
