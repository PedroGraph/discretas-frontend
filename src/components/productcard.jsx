import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { currencyFormat } from "../utils/formats";
import "../css/productcards.css";

const ProductCard = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Link to={`/${product.category}/${product.name}_${product.id}`} state={{ productDetails: product }} key={product.id} className="border-[1px] bg-gray-100 rounded flex gap-4 py-1 px-2 w-full cursor-pointer">
          <img src={product?.images[0]?.imageName} alt="product" className="rounded w-full object-cover xs:h-[100px] xs:max-h-[150px] xs:max-w-[150px] lg:max-w-[200px] lg:h-[200px]"/>
          <div className="flex flex-col xs:gap-1 sm:gap-2 lg:gap-2 pt-2">
              <p className="xs:text-[12px] lg:text-lg font-normal">{product.name}</p>
              <p className="xs:text-[10px] lg:text-[14px]">+200 ventas en todo el mes</p>
              <p className="xs:text-[10px] lg:text-[14px]">(5) ⭐⭐⭐⭐⭐</p>
              <p className="xs:text-[12px] lg:text-xl font-bold">{currencyFormat(product.price)}<span className="xs:text-[10px] lg:text-sm font-normal"> COP</span><span className="font-bold text-[#8941ff]"> {product.discount ? `-${product.discount}%` : ""}</span></p>
              <p className="xs:text-[10px] lg:text-sm">Categoría: {product.category}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired,
};

export default ProductCard;