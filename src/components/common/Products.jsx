import React, { useState, useEffect} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import ProductList from './ProductList';
import FilterParams from './FilterParams';
import '../css/style_products.css';
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [sortAlphabetically, setSortAlphabetically] = useState(false); 
    const [sortType, setSortType] = useState('default'); 
    
  const [lowestPriceProduct, setLowestPriceProduct] = useState(null);
  const [highestPriceProduct, setHighestPriceProduct] = useState(null);

    useEffect(() => {
      axios.get(`https://discretas-backend.onrender.com/products/`)
        .then((response) => {
          setProducts(response.data);
          setFilters(response.data);

          // Find lowest price product
          const lowestPrice = response.data.reduce((min, product) =>
            product.price < min.price ? product : min
          );
          setLowestPriceProduct(lowestPrice);

          // Find highest price product
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
      if (sortType === 'asc') {
        const sortedProducts = [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProducts(sortedProducts);
      } else if (sortType === 'desc') {
        const sortedProducts = [...products].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setProducts(sortedProducts);
      }
    }, [sortType]);
  

  const handleFilter = ({ name, price, stars }) => {
    // Aplica los filtros según los parámetros ingresados
    const filteredProducts = filters.filter((product) => {
      return (
        (name === '' || product.name.toLowerCase().includes(name.toLowerCase())) &&
        (price === '' || product.price <= parseInt(price)) &&
        (stars === 0 || product.stars == stars)
      );
    });
    setProducts(filteredProducts);
  };

  const handleSortAlphabetically = () => {
    setSortType(prevSortType => {
      let newSortType = '';
      if (prevSortType === 'default') {
        newSortType = 'asc';
      } else if (prevSortType === 'asc') {
        newSortType = 'desc';
      } else if (prevSortType === 'desc') {
        newSortType = 'default';
      }
  
      setSortAlphabetically(newSortType === 'default');
      return newSortType;
    });
  };

  return (
    <div className='p-4'style={{minHeight: "800px", backgroundColor: "#f7f7f7"}}>
      <div className="d-flex" >
        <div className="p-5" style={{backgroundColor: "#ffffff", borderRadius: "2%"}}>
          {
            !highestPriceProduct && !lowestPriceProduct ? (
              <Spinner animation="border" size="sm" />
            ):(
               
              <FilterParams onFilter={handleFilter} lower={lowestPriceProduct} higher={highestPriceProduct}/>
            )
          }
        </div>
        <div className='p-5' style={{marginLeft: "2em", width: "100%", backgroundColor: "#ffffff", borderRadius: "2%"}}>
          <div className="d-flex align-items-center mb-5" style={{justifyContent: "flex-end"}}>
            <span className="mr-2">Ordenar Alfabéticamente: &nbsp;</span>
              <button
                className="btn btn-dark btn-sm"
                onClick={handleSortAlphabetically}
              >
                {sortType === 'asc'
                  ? 'A-Z'
                  : sortType === 'desc'
                  ? 'Z-A'
                  : 'Normal'}
              </button>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
