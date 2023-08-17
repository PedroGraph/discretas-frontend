import React, { useState, useRef, useEffect } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cities, setCities] = useState(['Condones', 'Lubricantes']);
  const listGroupRef = useRef(null);


  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const results = cities.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5); // Limitamos los resultados a 5 opciones

    setSearchResults(results);
  };

  const handleOptionClick = (option) => {
    // Aquí puedes hacer algo con la opción seleccionada, como almacenarla en el estado o enviarla a otro componente
    console.log('Opción seleccionada:', option);
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

  useEffect(() => {
    // showCities()
  }, [])
  
  // async function showCities() {
  //   await axios
  //     .get(`http://127.0.0.1:3000/json-uni/cities`)
  //     .then((response) => {
  //       setCities(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };



  return (
    <div>
      <Form style={{width: "90%"}}>
        <FormControl
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Form>

      <ListGroup ref={listGroupRef} style={{position: "absolute", width: "11%"}}>
        {searchResults.map((item, index) => (
          <ListGroup.Item key={index} onClick={() => handleOptionClick(item)}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};