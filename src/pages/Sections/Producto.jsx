import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import useProductContext from '../../components/hooks/useProductContext';
import './FailPageEarly.css'

const Producto = () => {
  const { products } = useProductContext();
  const { productId } = useParams();
  const product = products.find(product => product['_id'] === productId);

  useEffect(() => {
  }, [product]);

  return (
    <div className='container-detail'>
      <div className=''>
        {!product ? (
          <div className="loader"></div>
        ) : (
          <>
            <ProductDetail product={product} />
          </>
        )}
      </div>
      
    </div>
  );
};

export default Producto;
