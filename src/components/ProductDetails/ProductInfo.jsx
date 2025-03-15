import PropTypes from "prop-types";
import { useState, useEffect, memo, useCallback } from "react";
import { currencyFormat } from "../../utils/formats";
import { colorMap } from "../../utils/helper";
import AddProductToCart from "./AddProductToCart";
import { Heart } from "lucide-react";
import { useUserStore } from "../../stores/userStore";
import Accordion from "../accordion";

// Memoizar el componente
const ProductInfo = memo(({
  selectedCharacteristic,
  handleCharacteristics,
  productDetails,
  handleAddProductToCart,
  isDone,
  loadingButton,
  errorButton,
}) => {
  const { name, price, characteristics = [] } = productDetails;
  const { setWishlist, wishlist, getWishlist } = useUserStore();
  const [sectionSelected, setSectionSelected] = useState("color");

  const groupedSizes = characteristics.reduce((acc, { size, color, quantity }) => {
    if(!size || !color) return acc;
    if (!acc[size]) {
      acc[size] = [];
    }
    if (quantity > 0) {
      acc[size].push(color);
    }
    return acc;
  }, {});

  useEffect(() => {
    getWishlist(true);
  }, [getWishlist]);

  const handleSizeClick = useCallback((size) => {
    const firstColor = groupedSizes[size][0];
    handleCharacteristics({
      color: firstColor,
      size,
      quantity: selectedCharacteristic.quantity,
      ...productDetails,
    });
  }, [groupedSizes, handleCharacteristics, selectedCharacteristic, productDetails]);

  return (
    <>
      <h1 className="xs:text-xl lg:text-4xl font-medium dark:text-white">
        {name}
      </h1>
      <span className="font-light text-[14px] dark:text-white">
        ⭐⭐⭐⭐⭐ (5) calificaciones | 4355 ventas
      </span>
      <span className="xs:text-2xl lg:text-4xl py-2 font-bold dark:text-white">
        {currencyFormat(price)}{" "}
        <span className="text-sm font-light dark:text-white">COP</span>
      </span>
      <div className={`w-100 bg-gray-200 dark:bg-gray-800 grid-cols-2 gap-2 rounded p-2 mt-4 ${Object.keys(groupedSizes).length > 0 ? "grid" : "hidden"}`}>
        <span
          className={`font-bold text-center px-4 py-2 rounded cursor-pointer ${
            sectionSelected === "color"
              ? "bg-black text-white dark:bg-[#8941ff] dark:text-white"
              : "bg-gray-400 dark:bg-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => setSectionSelected("color")}
        >
          Colores
        </span>
        <span
          className={`font-bold text-center px-4 py-2 rounded cursor-pointer ${
            sectionSelected === "size"
              ? "bg-black text-white dark:bg-[#8941ff] dark:text-white"
              : "bg-gray-400 dark:bg-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => setSectionSelected("size")}
        >
          Tallas
        </span>
      </div>
      {sectionSelected === "size" && (
        <div className="flex gap-2 lg:mb-4">
          {Object.keys(groupedSizes).map((size) => (
            <span
              key={size}
              className={`xs:w-10 xs:h-10 lg:w-14 lg:h-14 cursor-pointer dark:text-white flex ${
                selectedCharacteristic.size === size
                  ? "bg-black"
                  : "bg-gray-300 hover:border-2 hover:border-[#8941ff]"
              } items-center justify-center rounded-lg text-white xs:text-md lg:text-2xl`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </span>
          ))}
        </div>
      )}
      {sectionSelected === "color" && (
        <div className="flex gap-2 lg:mb-4">
          {groupedSizes[selectedCharacteristic.size]?.map((color, index) => (
            <span
              key={index}
              className={`xs:w-10 xs:h-10 lg:w-14 lg:h-14 cursor-pointer dark:text-white border-[1px] border-black ${
                selectedCharacteristic.color === color
                  ? colorMap[`${color.toLowerCase()}Selected`]
                  : colorMap[color.toLowerCase()]
              } rounded-full hover:border-[#8941ff]`}
              onClick={() =>
                handleCharacteristics({
                  color,
                  size: selectedCharacteristic.size,
                  quantity: selectedCharacteristic.quantity,
                  ...productDetails,
                })
              }
            />
          ))}
        </div>
      )}
      <div className="xs:grid xs:grid-cols-6 sm:flex gap-4 justify-between">
        <div className="flex xs:pt-4 lg:pt-0 sm:order-1 xs:col-span-5">
          <button
            className="xs:w-16 xs:h-10 lg:w-8 xl:w-10 xl:h-10 bg-gray-300 flex items-center justify-center rounded rounded-r-none font-bold"
            onClick={() =>
              handleCharacteristics({
                color: selectedCharacteristic.color,
                size: selectedCharacteristic.size,
                quantity:
                  selectedCharacteristic.quantity < 10
                    ? selectedCharacteristic.quantity + 1
                    : selectedCharacteristic.quantity,
                ...productDetails,
              })
            }
          >
            +
          </button>
          <input
            type="number"
            className="xs:w-24 lg:w-12 xl:w-20 h-10 text-center border-[1px] focus:outline-none [&::-webkit-inner-spin-button]:hidden font-bold"
            value={selectedCharacteristic.quantity}
            onChange={(e) => {
              const newQuantity = Math.max(
                1,
                Math.min(10, Number(e.target.value) || 1)
              );
              handleCharacteristics({
                ...selectedCharacteristic,
                quantity: newQuantity,
              });
            }}
          />
          <button
            className="xs:w-16 xs:h-10 lg:w-8 xl:w-10 xl:h-10 bg-gray-300 flex items-center justify-center rounded rounded-l-none font-bold"
            onClick={() =>
              handleCharacteristics({
                color: selectedCharacteristic.color,
                size: selectedCharacteristic.size,
                quantity:
                  selectedCharacteristic.quantity === 1
                    ? 1
                    : selectedCharacteristic.quantity - 1,
                ...productDetails,
              })
            }
          >
            -
          </button>
        </div>
        <div className="w-full xs:order-3 sm:order-2">
          <AddProductToCart
            handleAddProductToCart={handleAddProductToCart}
            isDone={isDone}
            loadingButton={loadingButton}
            errorButton={errorButton}
            userId={""}
            className={"w-full"}
          />
        </div>
        <button className="bg-gray-200 dark:bg-gray-800 rounded-lg h-10 px-2 xs:order-2 sm:order-3 mx-auto xs:mt-4 lg:mt-0" onClick={() => {
          if (!wishlist.error) setWishlist({ id: productDetails.id });
          else window.location.href = "/login";
        }}>
          <Heart
            className={`dark:text-white ${
              !wishlist.error && wishlist.some((product) => product.productId === productDetails.id)
                ? "text-red-500 dark:text-red-500 fill-red-500 dark:fill-red-500"
                : "text-gray-400 dark:text-gray-400 fill-gray-400 dark:fill-gray-400"
            }`}
          />
        </button>
      </div>
      <div className="w-full">
        <Accordion title="Información del producto">
          <div className="flex flex-col gap-2 p-2 ">
            <span className="text-sm font-medium text-gray-800 dark:text-white">Elegante conjunto de encaje que combina comodidad y sensualidad. Perfecto para ocasiones especiales.</span>
          </div>
        </Accordion>
        <Accordion title="Detalles del producto">
          <ul className="list-disc pl-5 space-y-2 dark:text-white">
            {/* Detalles del producto aquí */}
          </ul>
        </Accordion>
      </div>
    </>
  );
});

ProductInfo.propTypes = {
  selectedCharacteristic: PropTypes.shape({
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handleCharacteristics: PropTypes.func.isRequired,
  productDetails: PropTypes.object.isRequired,
  handleAddProductToCart: PropTypes.func.isRequired,
  isDone: PropTypes.bool.isRequired,
  loadingButton: PropTypes.bool.isRequired,
  errorButton: PropTypes.bool.isRequired,
};

export default ProductInfo;