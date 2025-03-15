import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/mainpage.css";
import ShopByCategory from "../../components/shopByCategory";
import RecommendedProducts from "../../components/RecommendedProducts";
import NewCollections from "../../components/ProductDetails/newColection";

function HomeSlider() {
  const settings = {
    className: "cursor-pointer relative",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <main className="dark:bg-gray-900 bg-white">
      <div className="bg-white dark:bg-gray-900 w-full relative">
        <Slider {...settings}>
          {[1, 2, 3, 4].map((image, index) => (
            <>
              <img
                src={`/main/lenceria${image}.webp`}
                index={index}
                alt={`Image_${index}`}
                className="w-full xs:h-[400px] lg:h-[500px] object-cover filter brightness-50"
              />
              <h1
                index={index}
                className="absolute flex flex-col text-center lg:text-5xl xs:text-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-dancing-script text-white"
              >
                Seasonal Seduction{" "}
                <span className="lg:text-2xl xs:text-xs">
                  Unveiling the Hottest Lingerie Trends
                </span>
              </h1>
            </>
          ))}
        </Slider>
      </div>
      <ShopByCategory />
      <div className="dark:bg-gray-900 bg-white w-full">
        <RecommendedProducts
          title="Productos recomendados"
          section={true}
          className="w-full"
        />
      </div>
      <div className="dark:bg-gray-900 bg-white w-full">
        <NewCollections />
      </div>
    </main>
  );
}

export default HomeSlider;
