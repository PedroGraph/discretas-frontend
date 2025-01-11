import { useState, useRef } from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ImagesCarousel ({images}) {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        infinite: images?.length > 1,
        arrows: false,
        speed: 500,
        className: "cursor-pointer flex justify-center items-center",
        afterChange: (index) => setSelectedIndex(index),
    };

    const handleThumbnailClick = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    return (
        <div className="bg-white rounded ">
        <Slider ref={sliderRef} {...settings}>
          {images?.map((image, index) => {
            return (
            <div key={`Imagen ${index}`}>
              <img src={image?.imageName} alt={`Imagen ${index}`} className="rounded max-w-[600px] w-full h-[300px] object-cover" />
            </div>
          )})}
        </Slider>
        <div className="flex gap-4 w-full justify-center">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer ${index === selectedIndex ? 'active' : 'opacity-25'}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={image?.imageName} alt={`Miniatura ${index}`} className="xs:h-[45px] lg:h-[75px] rounded" />
            </div>
          ))}
        </div>
      </div>
    )
}

ImagesCarousel.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        imageName: PropTypes.string.isRequired,
      })
    ).isRequired
}