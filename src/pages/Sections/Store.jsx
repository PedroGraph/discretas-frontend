import React from 'react';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Orders from '../../components/common/Orders';

const Producto = () => {

  return (
    <>
     <div style={{backgroundColor: "#f7f7f7"}}>
      <Navbar />
          <Orders/>
      <Footer/>
       </div>
    </>
  );
};

export default Producto;
