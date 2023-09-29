import React, {useState} from "react";
import Carousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/related_product.css';
import Currency from "./CurrencyFormater";

const RelatedProduct = ({ products }) => {
    

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3},
    };
    
    const items = products.map((product, index) =>{
        return (
          <div className="item" key={index}>
            <img src={product.photourl} alt="image" />
            <div>
              <span>{product.name}</span>
              <Currency amount={product.price}/>
            </div>
          </div>
        )
    })

    return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <h3>Productos Relacionados</h3>
      </div>
      <Carousel
        autoPlayInterval={1000}
        animationDuration={1000}
        infinite
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </>
    )
}

export default RelatedProduct;