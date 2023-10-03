import React, { useState, useRef, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import search from '../../../image/buscar.svg'
import Currency from './CurrencyFormater'
import {searchProducts} from '../services/Products'
import {SecondLoader} from './Loader'

export const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listGroupRef = useRef(null);

  const handleInputChange = (e) => {
    const {value} = e.target
    setIsLoading(true)
    searchProducts([])
    setSearchTerm(value)
    searchProducts(value)
    .then(products =>  {
      setSearchResults(products)
    })
    .finally(setIsLoading(false))
  };

  const handleOptionClick = (productId) => {
    window.location.href = '/lubricantes/' + productId;
  };

  const handleOutsideClick = (e) => {
    const {target} = e
    setSearchResults(!(listGroupRef.current && !listGroupRef.current.contains(target))); 
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };

  }, []);

  return (
    <div className='input-seacher mt-2 me-5' style={{ position: 'relative' }}>
      <div style={{width: "100%"}}>
        <label className='input-label'>
          <img src={search} alt='Imagen de ejemplo' />
        </label>
        <input
          type="text"
          placeholder=""
          value={searchTerm}
          onChange={handleInputChange}
          className='input-with-image text-search'
        />
      </div>
        <ListGroup ref={listGroupRef} className='list-group-container'>
        {
        searchResults?.length > 0 && !isLoading ? (
            searchResults.map((item, index) => (
              <ListGroup.Item key={index} onClick={() => handleOptionClick(item._id)} className='item-group-container'>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <img src={item.image[0]} alt="" style={{maxWidth: "65px", maxHeight: "65px"}}/>
                    </div>
                    <div className='px-3'><strong>{item.name}</strong></div>
                  </div>
                 
                  <div className='p-3'><span><Currency amount={item.price}/></span></div>
                </div>
              </ListGroup.Item>
            ))
        ): searchResults.length === 0 && searchTerm && !isLoading ? (
          <ListGroup.Item  className='item-group-container'>
            <div className='d-flex justify-content-center'>
              <div className='p-3'><strong>No encontramos un producto con ese nombre :(</strong></div>
            </div>
          </ListGroup.Item>
      ): isLoading && searchResults.length === 0 &&(
          <ListGroup.Item  className='item-group-container'>
            <div className='d-flex justify-content-center'>
              <SecondLoader/>
            </div>
          </ListGroup.Item>
        )}
        </ListGroup>
    </div>
  );
};