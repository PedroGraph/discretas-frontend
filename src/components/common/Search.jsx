import React, { useState, useRef, useEffect } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';
import search from '../../../image/buscar.svg'
import axios from 'axios';
import Currency from './CurrencyFormater'

export const SearchBar = () => {

  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState(['Condones', 'Lubricantes']);
  const listGroupRef = useRef(null);


  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const results = products.filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 3); // Limitamos los resultados a 5 opciones

    setSearchResults(results);
  };

  const handleOptionClick = (option) => {
    const productId = products.find(product => product.name === option)._id
    window.location.href = '/products/' + productId;
  };

  const handleOutsideClick = (e) => {
    if (listGroupRef.current && !listGroupRef.current.contains(e.target)) {
      setSearchResults([]); // Ocultar el ListGroup cuando se hace clic fuera de él
    }
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
        {searchResults.map((item, index) => (
          <ListGroup.Item key={index} onClick={() => handleOptionClick(item.name)} className='item-group-container'>
            <div className='d-flex justify-content-center'>
              <div><img src={item.image[0]} alt="" style={{maxWidth: "65px", maxHeight: "65px"}}/></div>
              <div className='p-3'><strong>{item.name}</strong></div>
              <div className='p-3'><span>$<Currency amount={item.price}/></span></div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};