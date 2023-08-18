import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import RelatedProducts from '../../components/common/RelatedProducts';
import axios from 'axios'
import './FailPageEarly.css'

const Producto = () => {

  const location = useLocation();
  const productId = location.pathname.split("/");

  const [data, setData] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios.get(`${__BACKEND_URL__}products/${productId[2]}`, { cancelToken: source.token })
      .then((response) => {
       setData(true);
       setProduct(response.data);
       localStorage.setItem("productData", JSON.stringify(response.data));
    })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log(error);
        } 
    });
    return () => {
      source.cancel(); 
    };
  }, []);

  return (
    <div style={{backgroundColor: "#f7f7f7"}}>
      <Navbar />
      <div style={{minHeight: "600px"}}>
        {
          data && product ? (
            <>
              <ProductDetail product={product}/> 
              <RelatedProducts/>
            </>
          ):(
            <div className="loader"></div>
          )
        }
      </div>
      <Footer/>
    </div>
  );
};

export default Producto;
