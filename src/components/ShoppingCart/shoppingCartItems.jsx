import { currencyFormat } from "../../utils/formats";
import { colorMap } from "../../utils/helper";
import PropTypes from "prop-types";

export default function ShoppingCartItems({
  products,
  updateQuantity,
  deleteProduct,
}) {
  return (
    <>
      {products.map((product, index) => (
        <div
          key={index}
          className="flex flex-col bg-white rounded lg:h-[230px]"
        >
          <div className="flex xs:px-4 xs:py-4 xs:pb-1 lg:pb-0 lg:pt-4 gap-4">
            <div className="flex flex-col gap-4 ">
              <img
                src={product.product.images[0].imageName}
                className="xs:h-[90px] xs:w-[120px] lg:w-[180px] lg:h-[120px] rounded"
              />
              <div className="flex">
                <button
                  className="xs:w-10 lg:w-1/3 h-5 bg-[#8941ff] text-white flex items-center justify-center rounded rounded-r-none"
                  onClick={() => {
                    updateQuantity(index, false);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  className="xs:w-10 lg:w-1/3 h-5 text-sm text-center border-[1px] focus:outline-none [&::-webkit-inner-spin-button]:hidden"
                  value={product.quantity}
                />
                <button
                  className="xs:w-10 lg:w-1/3 h-5 bg-[#8941ff] text-white flex items-center justify-center rounded rounded-l-none"
                  onClick={() => {
                    updateQuantity(index, true);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="xs:w-4/6 lg:w-full">
              <div className="flex flex-col gap-1 h-auto">
                <a className="xs:text-[10px] lg:text-lg xs:line-clamp-4 lg:line-clamp-3 mb-1">
                 NOJODA TU MALDIUTA MADRE PERRO TRIPLE HIJO DE LA GRAN PUTA MALPARIDO SAMPLE PRODUCT
                </a>
                <div className="flex items-center ">
                  <span className="w-[40px] xs:text-[10px] lg:text-sm">Color:</span>
                  <span
                    className={`h-4 w-4 ${
                      colorMap[product.color + "Selected"]
                    } rounded`}
                  />
                </div>
                <div className="flex items-center ">
                  <span className="w-[40px] xs:text-[10px] lg:text-sm">Talla:</span>
                  <span className="xs:text-xs lg:text-lg">{product.size}</span>
                </div>
                <span className="font-bold xs:text-md lg:text-xl">
                  {currencyFormat(
                    product.product.productPrice * product.quantity
                  )}{" "}
                  <span className="xs:text-[8px] lg:text-[10px] font-light">COP</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex xs:justify-between lg:justify-end px-4 py-2 gap-4">
            <button className="bg-gray-200 px-2 text-black rounded xs:text-[10px] lg:text-[12px]">
              Guardar para más tarde
            </button>
            <button
              className="bg-black text-white py-1 rounded xs:text-[10px] lg:text-[12px] px-2"
              onClick={() => {
                deleteProduct(index);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

{
  /* <img
            src={product.product.images[0].imageName}
            alt="product_image"
            className="xs:w-[60px] xs:h-[60px] lg:w-[180px] lg:h-[180px] rounded"
            
          />
          <div className="flex flex-col gap-4 w-3/4">
            <a className="xstext-sm lg:text-xl line-clamp-1">
              {product.product.productName}
            </a>
            <div className="flex items-center gap-2">
              <span className="w-[40px] xs:text-xs lg:text-sm">Color:</span>
              <span
                className={`h-4 w-4 ${
                  colorMap[product.color + "Selected"]
                } rounded`}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[40px] xs:text-xs lg:text-sm">Talla:</span>
              <span>{product.size}</span>
            </div>
            <div>
          
            </div>
          </div>
          <div className="w-1/4 flex flex-col items-end justify-center gap-4 max-h-[250px] h-[180px]">
            <span className="font-bold text-xl pt-6">
              {currencyFormat(product.product.productPrice * product.quantity)}{" "}
              <span className="text-[10px] font-light">COP</span>
            </span>
            <button
              className="bg-black text-white px-4 py-1 rounded text-sm"
              onClick={() => {
                deleteProduct(index);
              }}
            >
              Eliminar
            </button>
            
          </div> */
}

ShoppingCartItems.propTypes = {
  products: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
