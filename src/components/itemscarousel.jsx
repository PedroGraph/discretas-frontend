import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currencyFormat } from "../utils/formats";
import { ArrowRight } from "lucide-react";

export default function ItemsCarousel({
  items,
  section,
  setWishlist,
  wishlist,
}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "pointer-events-auto",
    autoplay: section,
    autoplaySpeed: section ? 55000 : 0,
    arrows: false,
    swipe: true,
    draggable: true,
    accessibility: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 878,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const emptyItems = Array(3).fill({
    id: 'skeleton',
    name: '',
    price: '',
    images: [{ imageName: '/ .webp' }],
    category: ''
  });

  return (
    <div className="w-full">
      {/* Slider normal cuando section es false */}
      {!section && (
        <div className="rounded flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="!flex">
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 p-2">
                <img
                  src={item?.images[0]?.imageName}
                  alt="product_image"
                  className="w-[100px] min-w-[100px] h-[120px] object-cover aspect-square rounded cursor-pointer"
                />
                <div className="flex flex-col gap-1 w-full">
                  <span className="text-xs cursor-pointer line-clamp-1 dark:text-white">
                    {item.name}
                  </span>
                  <span className="font-bold text-sm dark:text-white">
                    {currencyFormat(item.price)}
                  </span>
                  <span className="xs:text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
                  <button className="text-[10px] xs:w-[100px] lg:w-full bg-[#8941ff] text-white p-1 rounded cursor-pointer mt-auto">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slider cuando section es true */}
      {section && (
        <div className="w-full xs:px-8 py-2 md:p-0">
          <Slider {...settings}>
            {(items?.length ? [...items] : emptyItems).map(
              (item) => (
                <div key={item.id} className="!flex relative">
                  <div className={`flex flex-col w-full p-2 rounded ${!items?.length ? 'animate-pulse' : ''}`}>
                    <img
                      src={item?.images[0]?.imageName}
                      alt="product_image"
                      className={`w-full bg-white xs:h-[200px] lg:h-[550px] object-cover pb-4 bg-white rounded-t-lg z-10 relative ${items?.length ? 'cursor-pointer' : 'opacity-50'}`}
                      loading="lazy"
                      onError={(e) => (e.target.src = "/productEmpty.webp")}
                      onClick={() => items?.length && (window.location.href = `/${item.category}/${item.name}_${item.id}`)}
                    />
                    <div className="flex flex-col gap-1 w-full bg-white rounded-b-lg">
                      {items?.length ? (
                        <>
                          <span
                            className="xs:text-sm lg:text-base xs:px-2 md:px-4 mt-4 line-clamp-1 cursor-pointer z-10 relative"
                            onClick={() => (window.location.href = `/${item.category}/${item.name}_${item.id}`)}
                          >
                            {item.name}
                          </span>
                          <span className="font-bold xs:px-2 xs:text-lg md:px-4 xs:py-2">
                            {currencyFormat(item.price)}
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="h-4 bg-gray-200 rounded mt-4 mx-2 md:mx-4"></div>
                          <div className="h-6 bg-gray-200 rounded mx-2 md:mx-4 my-2"></div>
                        </>
                      )}
                    </div>
                      {console.log(wishlist)}
                    {items?.length > 0 && (
                      <div
                        className={`absolute top-5 right-5 p-2 ${
                          !wishlist.error && wishlist.some(
                            (product) => product.productId === item.id
                          )
                            ? "bg-[#8941FF] text-white hover:bg-white hover:text-black"
                            : "bg-white text-black hover:bg-[#8941FF] hover:text-white"
                        }  rounded-full cursor-pointer shadow-md z-10`}
                        onClick={() => {
                          if(wishlist.error) window.location.href = `/login`;
                          else setWishlist({ id: item.id });
                        }}
                      >
                        <svg
                          className="md:w-6 md:h-6 xs:h-4 xs:w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </Slider>
          <div className="flex justify-center items-center mt-8 w-full">
            <button className="flex items-center text-[#8941ff] dark:text-white text-sm px-4 py-2 rounded-lg border-2 border-[#8941ff] dark:border-[#8941ff] hover:border-black hover:text-black dark:hover:border-white" onClick={() => window.location.href = "/tienda"}>
              Ver toda la colección <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
