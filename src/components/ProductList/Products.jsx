import React, {useState} from 'react';
import useProductContext from '../hooks/useProductContext';
import { Button, Modal, Spinner, Form } from 'react-bootstrap';
import ProductList from './ProductList';
import FilterParams from './FilterParams';
import Filter from '../../../image/filtrar.png'
import {MainLoader}  from '../common/Loader';
import '../css/style_products.css';

const Products = () => {

  const {products} = useProductContext();

  return (
    <div className='min-h-screen'>
      {products.length > 0 ? ( 
        <div className='bg-gray-300 d-flex lg:ps-2 mt-20 xl:mt-0 d-flex xs:flex-col lg:flex-row'>
          <div className='lg:w-2/6 xl:w-[20%] bg-white lg:pt-3 xs:pt-1 lg:px-4 sm:px-2'>
            <FilterParams />
          </div>
            <ProductList products={products} />
        </div>
      ):(
        <div>
          <MainLoader/>
        </div>            
      )}
    </div>
  );
};

export default Products;
