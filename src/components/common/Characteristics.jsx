import React, { useState, useEffect } from 'react';
import useProductContext from '../hooks/useProductContext';
import '../css/product_details.css';

const Characteristics = ({product}) => {

  const { productPurchased, setProductPurchased } = useProductContext() ?? {};

  const [selectedColor, setSelectedColor] = useState(product ? product.characteristics[0].color : null);
  const [selectedSize, setSelectedSize] = useState(product ? product.characteristics[0].size[0] : null);
  const [items, setItems] = useState(product.characteristics);

  useEffect(() => {
    if (productPurchased) {
      productPurchased.size = selectedSize;
      productPurchased.color = selectedColor;
      setProductPurchased(productPurchased);
    }
  }, [items, selectedColor, productPurchased]);
  

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setProductPurchased({ ...productPurchased, color, size: items.find(item => item.color === color).size[0] });
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setProductPurchased({ ...productPurchased, size });
  };

  const selectedColorItem = items.find(item => item.color === selectedColor);
  const disabled = {
    opacity: "0.1",
    pointerEvents: "none"
  }

  return (
    <div className="mb-3 d-flex ">
        <div className='mt-4 col-md-6 mb-3'>
          <label className='mb-2' htmlFor="colorSelect">Selecciona un color:</label>
          <div className='d-flex flex-wrap'>
            {items.map((item, index) => (
              <div
                className='mb-1 me-3 item-diff-color '
                key={index}
                onClick={() => handleColorSelection(item.color)}
                style={{
                  backgroundColor: item.color,
                  border: selectedColorItem && selectedColorItem.color === item.color ? '2px solid #8b8b8b' : '',
                  ...(item.quantity == 0 && disabled)
                }}
              />
            ))}
          </div>
        </div>
        {selectedColorItem && (
            <div className='mt-2 col-md-6 d-flex flex-column mb-3'>
              <label htmlFor="sizeSelect" className='mt-3'>Selecciona una talla:</label>
              <div className='items-diff-size d-flex flex-wrap'>
              {items.map(item => (
                  selectedColorItem.color === item.color && (
                    item.size.map((size, index) =>(
                        <div key={index}
                        className={selectedSize === size ? 'item-selected-size' : ''}
                        onClick={() => {handleSizeSelection(size)}}>
                            {size}
                        </div>
                    ))
                  )
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

export default Characteristics;
