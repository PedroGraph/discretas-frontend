import React from "react";
import Slider from "react-slick";
import mainLenceria from "../../images/mainlenceria.webp";
import mainLenceria2 from "../../images/lenceria2.webp";
import mainLenceria3 from "../../images/lenceria3.webp";
import mainLenceria4 from "../../images/lenceria4.webp";

const images = [
  mainLenceria,
  mainLenceria2,
  mainLenceria3,
  mainLenceria4,
];


function HomeSlider() {

  const settings = {
    className: "cursor-pointer",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="h-[600px] relative ">
            <img src={image} alt={`Imagen ${index}`} className="w-full h-full object-cover filter brightness-50"/>
            <h1 className='absolute flex flex-col text-center text-5xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white shadow-md z-10'>
                Seasonal Seduction <span className='text-2xl'>Unveiling the Hottest Lingerie Trends</span>
            </h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeSlider;
