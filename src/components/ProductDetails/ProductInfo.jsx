import PropTypes from 'prop-types';
import { currencyFormat } from '../../utils/formats';
import { colorMap } from '../../utils/helper';
import AddProductToCart from './AddProductToCart';

const ProductInfo = ({ selectedCharactetiristic, setSelectedCharactetiristic, setModal, productDetails }) => {
  const { name, price, characteristics } = productDetails;
  return (
    <>
       <h1 className="text-2xl font-medium">{name}</h1>
        <span className="text-2xl font-bold">{currencyFormat(price)} <span className="text-sm font-light">COP</span></span>
        <span className="font-light text-[14px]">⭐⭐⭐⭐⭐ (5) calificaciones | 4355 ventas</span>
        {characteristics &&  characteristics?.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <span className='xs:text-sm lg:text-md'>Colores disponibles:</span>
              <div className="flex gap-2">
                {characteristics.map((detail, index) => (
                  <span key={index} className={`w-10 h-10 cursor-pointer ${selectedCharactetiristic.color === detail.color ? colorMap[`${detail.color}Selected`] : colorMap[detail.color]} rounded`} onClick={() => {setSelectedCharactetiristic({color: detail.color, size: selectedCharactetiristic.size, quantity: selectedCharactetiristic.quantity, ...productDetails})}}/>
                ))}
              </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className='xs:text-sm lg:text-md'>Tallas disponibles:</span>
            <div className="flex gap-2">
              {console.log(characteristics.find(detail => detail.color === selectedCharactetiristic.color).sizes)}
              {characteristics.find(detail => detail.color === selectedCharactetiristic.color)?.sizes?.map((size, index) => (
                <span
                  key={index}
                  className={`h-10 w-10 cursor-pointer flex ${selectedCharactetiristic.size === size.size ? 'bg-black' : 'bg-gray-500'} items-center justify-center rounded text-white text-[12px]`}
                  onClick={() => setSelectedCharactetiristic({color: selectedCharactetiristic.color, size: size.size, quantity: selectedCharactetiristic.quantity, ...productDetails})}
                >
                  {size.size}
                </span>
              ))}
            </div>
          </div>
        </>
        )}
        <div className="flex xs:pt-4 lg:pt-0">
          <button className="w-10 h-7 bg-gray-300 flex items-center justify-center rounded rounded-r-none" onClick={() => setSelectedCharactetiristic({color: selectedCharactetiristic.color, size: selectedCharactetiristic.size, quantity: selectedCharactetiristic.quantity < 10 ? selectedCharactetiristic.quantity + 1 : selectedCharactetiristic.quantity, ...productDetails })}>+</button>
          <input type="number" className="w-10 h-7 text-center border-[1px] focus:outline-none [&::-webkit-inner-spin-button]:hidden" value={selectedCharactetiristic.quantity}/>
          <button className="w-10 h-7 bg-gray-300 flex items-center justify-center rounded rounded-l-none" onClick={() => setSelectedCharactetiristic({color: selectedCharactetiristic.color, size: selectedCharactetiristic.size, quantity: selectedCharactetiristic.quantity === 1 ? 1 : selectedCharactetiristic.quantity - 1, ...productDetails})}>-</button>
          <span className="ml-2 flex items-center text-sm">Unidades disponibles ({characteristics.find(detail => detail.color === selectedCharactetiristic.color).sizes.find(size => size.size === selectedCharactetiristic.size)?.quantity})</span>
        </div>
        <div className="flex xs:flex-col sm:flex-row gap-4 pr-3 xs:pt-4 lg:pt-0">
          <AddProductToCart 
            product={selectedCharactetiristic}
            userId={''}
          />
          <button className="xs:w-full 2xl:w-1/4 h-10 bg-black text-white rounded" onClick={() => setModal(true)}>Comprar ahora</button>
        </div>
    </>
  );
};

ProductInfo.propTypes = {
  selectedCharactetiristic: PropTypes.shape({
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }),
  setSelectedCharactetiristic: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  productDetails: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired
};

export default ProductInfo;