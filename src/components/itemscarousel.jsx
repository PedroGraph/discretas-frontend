import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { currencyFormat } from "../utils/formats";

export default function ItemsCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    className: "xs:flex lg:hidden justify-center",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  // Mock data for testing
  const items = [
    { id: 1, name: "Producto 1 nojoda que cule nomvbre largo la mondá pelua", price: 2300 },
    { id: 2, name: "Producto 2", price: 4500 },
    { id: 3, name: "Producto 3", price: 6700 },
    { id: 4, name: "Producto 4", price: 8900 },
    { id: 5, name: "Producto 5", price: 1200 },
  ];

  return (
    <div className="w-full ">
      <div className="bg-white rounded xs:block lg:hidden">
        <Slider {...settings}>
          {items?.map((item) => (
            <div key={item.id} >
              <div className="flex xs:flex-col gap-4 p-2">
                <img
                  src="https://via.placeholder.com/200x200"
                  alt="product_image"
                  className="w-[100px] h-[100px]  rounded cursor-pointer"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs cursor-pointer line-clamp-1">{item.name}</span>
                  <span className="font-bold text-sm">{currencyFormat(item.price)}</span>
                  <span className="xs:text-xs sm:text-sm">⭐⭐⭐⭐⭐</span>
                  <button className="text-[10px] bg-[#8941ff] text-white p-1 rounded cursor-pointer mt-auto">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex 2xl:px-4 gap-4 w-full justify-center items-center lg:block xs:hidden">
        {items?.map((item) => (
            <div key={item.id}>
              <div className="flex  gap-2 p-2">
                <img
                  src="https://via.placeholder.com/200x200"
                  alt="product_image"
                  className="lg:w-[80px] lg:h-[80px] 2xl:w-[120px] 2xl:h-[120px]  rounded cursor-pointer"
                />
                <div className="flex flex-col gap-1 ">
                  <span className="lg:text-[10px] 2xl:text-sm cursor-pointer lg:line-clamp-1 2xl:line-clamp-2">{item.name}</span>
                  <span className="font-bold lg:text-[10px] 2xl:text-sm">{currencyFormat(item.price)}</span>
                  <span className="lg:text-[10px] 2xl:text-sm">⭐⭐⭐⭐⭐</span>
                  <button className="text-[10px] lg:w-[80px] 2xl:w-[100px] bg-[#8941ff] text-white p-1 rounded cursor-pointer lg:mt-auto">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}