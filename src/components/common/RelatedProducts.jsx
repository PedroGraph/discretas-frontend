import React from "react";
import '../css/related_product.css';
import useProductContext from "../../components/hooks/useProductContext";
import CurrencyFormatter from "../../components/common/CurrencyFormater";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProduct = ({ relatedProducts }) => {
  const { products } = useProductContext();
  const settings = {
    infinite: true,
    slidesToShow: relatedProducts || 6,
    slidesToScroll: relatedProducts || 6,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className='bg-white w-full py-4'>
      <h1 className='text-3xl font-bold  text-black py-4 text-center'>Productos Recomendados</h1>
      <div className="w-[95%] mx-auto">
        <Slider {...settings}>
          {products.length > 0 ? (
            products.slice(4, 12).map((product) => (
              <a key={product.id} className='px-2' href={`/${product.category}/${product.id}`}>
                <div className='bg-white rounded border'>
                  <img src={product.images[0].imageName} alt={product.name} className='h-[250px] w-full object-cover rounded-t' />
                  <span className="line-clamp-1 text-black px-3 mt-2 w-full text-xl">{product.name}</span>
                  <div className="flex items-center px-3 py-2 gap-2">
                    <CurrencyFormatter amount={product.price} className="font-bold" currency={true} />
                    <span className="text-xs mt-1 text-primary">#{Math.floor(Math.random() * 10) + 1} más vendidos</span>
                  </div>
                </div>
              </a>
            ))
          ):(
            <p>No hay productos</p>
          )}
        </Slider>
      </div>
    </section>
  )
}

export default RelatedProduct;