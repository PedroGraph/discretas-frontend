import { useState, useRef } from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ImagesCarousel ({images, subImages, className, text, arrows}) {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        infinite: images?.length > 1,
        arrows: arrows,
        speed: 500,
        className: `cursor-pointer flex justify-center items-center pb-4 w-100`,
        afterChange: (index) => setSelectedIndex(index),
    };

    const handleThumbnailClick = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    return (
        <div className={`bg-transparent xs:w-100  ${text && "sm:w-2/4 max-w-[500px] sm:mx-auto"} rounded`}>
        <Slider ref={sliderRef} {...settings}>
          {images?.map((image, index) => {
            return (
            <img key={`Imagen ${index}`} src={image?.imageName} alt={`Imagen ${index}`} className={`${className} object-cover lg:p-20`} />
          )})}
        </Slider>
        {
          subImages && (
            <div className="flex gap-4 w-full justify-center">
            {images?.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer ${index === selectedIndex ? 'active' : 'opacity-25'}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={image?.imageName} alt={`Miniatura ${index}`} className="xs:h-[45px] lg:h-[75px] rounded " />
              </div>
            ))}
           </div>
          )
        }
        {text && (
          <span className="text-white xs:text-xs lg:text-lg xs:mb-4  text-center pt-4 text-lg line-clamp-1">{text[selectedIndex]}</span>
        )}
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