import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useProductContext from '../hooks/useProductContext';

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
    <div className="mb-3">
      {items.length > 3 ? (
        <div>
          <label htmlFor="colorSelect">Selecciona un color:</label>
          <select
            id="colorSelect"
            className="form-select"
            onChange={(e) => handleColorSelection(e.target.value)}
            value={selectedColor}
          >
            {items.map((item, index) => (
              <option key={index} value={item.color}>
                {item.color}
              </option>
            ))}
          </select>
          {selectedColorItem && (
            <div>
              <label htmlFor="sizeSelect" className='mt-3'>Selecciona una talla:</label>
              <select
                id="sizeSelect"
                className="form-select"
                onChange={(e) => handleSizeSelection(e.target.value)}
                value={selectedSize || 0}
                setItems
              >
                {items.map((item) => (
                  item.color === selectedColorItem.color && (
                    item.size.map((size, index)=> (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))
                    
                    )
                  
                ))}
              </select>
            </div>
          )}
        </div>
      ) : (
        <div>
          {items.map((item, index) => (
            <div
              className='mb-1'
              key={index}
              onClick={() => handleColorSelection(item.color)}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: item.color,
                display: 'inline-block',
                marginRight: '10px',
                cursor: 'pointer',
                border: selectedColorItem && selectedColorItem.color === item.color ? '3px solid black' : '',
                ...(item.quantity == 0 && disabled)
              }}
            />
          ))}
          {selectedColorItem && (
            <div>
              <label htmlFor="sizeSelect" className='mt-3'>Selecciona una talla:</label>
              <select
                id="sizeSelect"
                className="form-select"
                onChange={(e) => handleSizeSelection(e.target.value)}
                value={selectedSize || 0}
                style={{width: '50%'}}
              >
                {items.map((item, index) => (
                    selectedColorItem.color === item.color && (
                        item.size.map((size, index) =>(
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))
                    )
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Characteristics;
