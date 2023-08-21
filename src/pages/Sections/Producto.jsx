import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import RelatedProducts from '../../components/common/RelatedProducts';
import useProductContext from '../../components/hooks/useProductContext';
import './FailPageEarly.css'

const Producto = () => {
  const { products } = useProductContext();
  const location = useLocation();
  const productId = location.pathname.split("/");

  const product = products.find(product => product['_id'] === productId[2]);

  useEffect(() => {
  }, [product]);

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <Navbar />
      <div style={{ minHeight: "600px" }}>
        {!product ? (
          <div className="loader"></div>
        ) : (
          <>
            <ProductDetail product={product} />
            <RelatedProducts />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Producto;
