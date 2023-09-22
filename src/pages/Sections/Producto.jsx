import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import Details from '../../components/common/ProductDetails/DetailsSection';
import useProductContext from '../../components/hooks/useProductContext';
import './FailPageEarly.css'

const Producto = () => {
  const { products } = useProductContext();
  const { productId } = useParams();
  const product = products.find(product => product['_id'] === productId);

  return (
    <div className='container-detail'>
      <div className='first-section'>
        <ProductDetail/>
      </div>
      <div className='second-section'>
        <Details/>
      </div>
    </div>
  );
};

export default Producto;
