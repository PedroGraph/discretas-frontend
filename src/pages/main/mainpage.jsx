import Slider from "react-slick";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../css/mainpage.css';


function HomeSlider() {

    useEffect(() => {
      document.title = "Discreta Seducción | Home";
    }, []);

    const settings = {
      className: "cursor-pointer",
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 10000,
      cssEase: "linear",
      arrows: false
    };
  
    return (
      <div className="dark:!bg-[#382b47]">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((image, index) => (
            <div key={index} className="lg:h-[600px] relative">
              <img src={`/main/lenceria${image}.webp`} alt={`Image ${index}`} className="w-full xs:max-h-[200px] md:max-h-[300px] lg:max-h-[800px] lg:h-full object-cover filter brightness-50"/>
              <h1 className='absolute flex flex-col text-center lg:text-5xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white shadow-md z-10'>
                  Seasonal Seduction <span className='lg:text-2xl xs:text-xs'>Unveiling the Hottest Lingerie Trends</span>
              </h1>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  
  export default HomeSlider;
  