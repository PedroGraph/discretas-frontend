import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import ProductList from './ProductList';
import FilterParams from './FilterParams';
import '../css/style_products.css';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [lowestPriceProduct, setLowestPriceProduct] = useState(null);
  const [highestPriceProduct, setHighestPriceProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://discretas-backend.onrender.com/products/`)
      .then((response) => {
        setProducts(response.data);
        setFilters(response.data);

        const lowestPrice = response.data.reduce((min, product) =>
          product.price < min.price ? product : min
        );
        setLowestPriceProduct(lowestPrice);

        const highestPrice = response.data.reduce((max, product) =>
          product.price > max.price ? product : max
        );
        setHighestPriceProduct(highestPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const sortProducts = (sortType) => {
      // Sorting logic based on sortType
      if (sortType === 'asc') {
        // Sort alphabetically ascending
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortType === 'desc') {
        // Sort alphabetically descending
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortType === 'priceAsc') {
        // Sort by price ascending
        return [...products].sort((a, b) => a.price - b.price);
      } else if (sortType === 'priceDesc') {
        // Sort by price descending
        return [...products].sort((a, b) => b.price - a.price);
      } else if (sortType === 'starsHigh') {
        // Sort by stars high to low
        return [...products].sort((a, b) => b.stars - a.stars);
      } else if (sortType === 'starsLow') {
        // Sort by stars low to high
        return [...products].sort((a, b) => a.stars - b.stars);
      } else {
        // Default sorting
        return [...products];
      }
    };

    setProducts(sortProducts(sortType));
  }, [sortType]);

  const handleFilter = ({ name, price, stars }) => {
    const filteredProducts = filters.filter((product) => {
      return (
        (name === '' ||
          product.name.toLowerCase().includes(name.toLowerCase())) &&
        (price === '' || product.price <= parseInt(price)) &&
        (stars === 0 || product.stars === stars)
      );
    });
    setProducts(filteredProducts);
  };

  return (
    <div className='p-4' style={{ minHeight: '800px', backgroundColor: '#f7f7f7' }}>
      <div className='d-flex'>
        <div className='p-5' style={{ backgroundColor: '#ffffff', borderRadius: '2%' }}>
          {!highestPriceProduct && !lowestPriceProduct ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <FilterParams onFilter={handleFilter} lower={lowestPriceProduct} higher={highestPriceProduct} />
          )}
        </div>
        <div
          className='p-5'
          style={{ marginLeft: '2em', width: '100%', backgroundColor: '#ffffff', borderRadius: '2%' }}
        >
          <div className='d-flex align-items-center mb-5' style={{ justifyContent: 'flex-end' }}>
            <span className='mr-2'>Ordenar por: </span>
            <select className='form-control' style={{'display': 'flex', width: '10em', marginLeft: '1em'}} value={sortType} onChange={(e) => setSortType(e.target.value)}>
              <option value='asc'>Nombre A-Z</option>
              <option value='desc'>Nombre Z-A</option>
              <option value='priceAsc'>Menor Precio</option>
              <option value='priceDesc'>Mayor Precio</option>
              <option value='starsHigh'>Mayor Valoración</option>
              <option value='starsLow'>Menor Valoración</option>
            </select>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
