import React from 'react';
import ProductDetail from '../../components/common/ProductDetail';
import Details from '../../components/common/ProductDetails/DetailsSection';
import RelatedProduct from '../../components/common/RelatedProducts';
import './FailPageEarly.css'

const Producto = () => {
  return (
    <div className='container-detail'>
      <div className='first-section'>
        <ProductDetail/>
      </div>
      <div className='second-section'>
        <Details/>
      </div>
      <div>
        <RelatedProduct/>
      </div>
    </div>
  );
};

export default Producto;
