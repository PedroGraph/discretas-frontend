import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import RelatedProducts from '../../components/common/RelatedProducts';
import useProductContext from '../../components/hooks/useProductContext';
import './FailPageEarly.css'

const Producto = () => {
  const { products } = useProductContext();
  const { productId } = useParams();
  const product = products.find(product => product['_id'] === productId);

  useEffect(() => {
  }, [product]);

  return (
    <div className='container-detail' style={{ backgroundColor: "#f7f7f7" }}>
      <div style={{ }}>
        {!product ? (
          <div className="loader"></div>
        ) : (
          <>
            <ProductDetail product={product} />
            <RelatedProducts />
          </>
        )}
      </div>
      
    </div>
  );
};

export default Producto;
