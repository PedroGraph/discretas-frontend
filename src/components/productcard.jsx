import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { currencyFormat } from "../utils/formats";
import { Heart } from "lucide-react";
import "../css/productcards.css";

const ProductCard = ({ products, listOrGrid, wishlist, setWishlist }) => {
  return (
   <div className={`${listOrGrid === "list" ? "flex flex-col" : "lg:grid lg:grid-cols-3"} w-full gap-4 px-2`}>
    {[...products].map((product) => (
      <div
        key={product.id}
        className={`relative border-[1px] dark:border-none bg-white dark:bg-slate-700 rounded  ${listOrGrid === "list" ? "flex items-center": "flex flex-col"} gap-4 w-full`}
      > 
      <Link to={`/${product.category}/${product.name}_${product.id}`} state={{ productDetails: product }}>
        <img
          src={product?.images[0]?.imageName}
          alt={product.name}
          className={`rounded object-cover ${listOrGrid === "list" ? "xs:w-[250px] xs:h-[140px] lg:w-[400px] lg:h-[200px]": "w-full h-[300px]"} `} 
          loading="lazy"
          onError={(e) => (e.target.src = "/productEmpty.webp")} 
        />
        </Link>
        <div className={`flex flex-col w-full xs:gap-1 sm:gap-2 lg:gap-2 lg:py-4`}>
          <Link to={`/${product.category}/${product.name}_${product.id}`} state={{ productDetails: product }}>
            <p className={`xs:text-[12px] lg:text-lg font-normal dark:text-white line-clamp-2 xs:h-16 lg:h-20 ${listOrGrid !== "list" && "px-4"}`}>{product.name}</p>
          </Link>
          <p className={`xs:text-[12px] lg:text-xl font-bold dark:text-white ${listOrGrid !== "list" && "px-4"}`}>
            {currencyFormat(product.price)}
            <span className="xs:text-[10px] lg:text-sm font-normal dark:text-white"> COP</span>
          </p>
        </div>
        <div className="absolute xs:bottom-1 xs:right-1 lg:top-2 lg:right-2 rounded-full gap-2 p-1 cursor-pointer" onClick={() => {
          if(!wishlist.error) setWishlist({ id: product.id })
          else window.location.href = "/login"
        }}>
          <Heart className={`xs:w-4 lg:w-6 text-gray-400 ${!wishlist.error && wishlist.some(item => item.productId === product.id) ? "text-red-500 fill-red-500" : "text-gray-500 fill-gray-500"} hover:fill-gray-600`} />
        </div>
        <span className="absolute xs:left-1 xs:top-1 lg:top-2 lg:left-2 font-bold text-white bg-[#8941ff] text-[10px] px-2 py-1 rounded-full">
          {!product.discount ? `0%` : ""}
        </span>
        <span className="absolute xs:left-1 xs:bottom-1 lg:top-2 lg:left-12 font-bold text-white bg-[#8941ff] text-[10px] px-2 py-1 rounded-full lg:hidden">
          Nuevo
        </span>
      </div>
    ))}
  </div>
  );
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          imageName: PropTypes.string.isRequired
        })
      ).isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
};


export default ProductCard;