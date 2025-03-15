import { currencyFormat } from "../../utils/formats";
import { colorMap } from "../../utils/helper";
import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function ShoppingCartItems({
  products,
  updateQuantity,
  deleteProduct,
}) {
  return (
    products.length > 0 && (
      <>
        {products.map((product, index) => (
          <div
            key={index}
            className={`flex flex-col bg-white ${
              product.deleting && "animate-pulse bg-slate-200 dark:bg-gray-400"
            } dark:bg-slate-500 w-full rounded lg:h-[230px] relative`}
          >
            <div className="flex xs:px-4 xs:py-4 xs:pb-1 lg:pb-0 lg:pt-4 gap-4">
              <div className="flex flex-col gap-4 ">
                <img
                  src={product.product.images[0].imageName}
                  className="xs:h-[90px] xs:w-[120px] lg:w-[180px] lg:h-[120px] rounded object-cover"
                />
                <div className="flex xs:pb-4 lg:pb-0">
                  <button
                    className="xs:w-10 xs:py-2 lg:py-4 lg:w-1/3 h-5 border-[1px] border-[#8941ff] bg-[#8941ff] text-white flex items-center justify-center rounded rounded-r-none text-2xl"
                    onClick={() => {
                      updateQuantity(index, false);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="xs:w-10 xs:py-2 lg:py-4 lg:w-1/3 h-5 text-sm text-center border-[1px] focus:outline-none [&::-webkit-inner-spin-button]:hidden"
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value, 10) || 1)
                    }
                  />
                  <button
                    className="xs:w-10 xs:py-2 lg:py-4 lg:w-1/3 h-5  border-[1px] border-[#8941ff] bg-[#8941ff] text-white flex items-center justify-center rounded rounded-l-none text-2xl"
                    onClick={() => {
                      updateQuantity(index, true);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-5/6">
                <div className="flex flex-col gap-1 h-auto">
                  <a className="xs:text-xs sm:text-sm font-bold lg:text-lg xs:line-clamp-4 dark:text-white lg:line-clamp-3 mb-1 lg:w-full w-[95%]">
                    {product.product.productName}
                  </a>
                  <span className="font-bold text-[#8941ff] xs:text-md lg:text-xl dark:text-white">
                    {currencyFormat(
                      product.product.productPrice * product.quantity
                    )}{" "}
                    <span className="xs:text-[8px] lg:text-[10px] text-[#8941ff] font-light dark:text-white">
                      COP
                    </span>
                  </span>
                  {product.color && (
                    <div className="flex items-center ">
                      <span className="w-[40px] xs:text-[12px] lg:text-sm dark:text-white">
                        Color:
                      </span>
                      <span
                        className={`h-4 w-4 ${
                          colorMap[product.color.toLowerCase() + "Selected"]
                        } rounded`}
                      />
                    </div>
                  )}
                  {product.size && (
                    <div className="flex items-center ">
                      <span className="w-[40px] xs:text-[12px] lg:text-sm dark:text-white">
                        Talla:
                      </span>
                      <span className="xs:text-xs lg:text-lg dark:text-white">
                        {product.size}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute cursor-pointer top-3 right-3 hover:bg-white flex justify-between items-center dark:bg-slate-700 p-0.5 rounded-full">
              <X
                className="text-gray-600 text-black dark:text-white"
                onClick={() => deleteProduct(index)}
              />
            </div>
          </div>
        ))}
      </>
    )
  );
}

ShoppingCartItems.propTypes = {
  products: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
