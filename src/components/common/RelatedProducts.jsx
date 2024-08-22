import React from "react";
import Carousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../css/related_product.css';
import { getRelatedProduct } from "../hooks/RelatedProducts/RelatedProducts";
import Currency from "./CurrencyFormater";

const RelatedProduct = () => {
    
    const {relatedProducts} = getRelatedProduct();

    const responsive = {
        568: { items: 1 },
        1024: { items: 3},
    };
    
    const items = relatedProducts ? relatedProducts.map((product, index) =>{
        return (
          <div className="item" key={index}>
            <a href={`/lubricante/${product._id}`}>
              <img src={product.image[0]} alt="image" />
              <div>
                <span className="mx-5 text-center">{product.name}</span>
                <Currency amount={product.price}/>
              </div>
            </a>
          </div>
        )
    }) : ''

    return (
      <>
      {items ? (
      <>
        <div className="d-flex justify-content-center mb-5 m">
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
      ):(
        <div>a</div>
      )}
      </>
    )
}

export default RelatedProduct;