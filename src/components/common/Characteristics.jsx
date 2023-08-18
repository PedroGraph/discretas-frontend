import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Characteristics = ({product, purchase}) => {

  const [selectedColor, setSelectedColor] = useState(product.length > 0 ? product[0].color : null);
  const [selectedSize, setSelectedSize] = useState(product.length > 0 ? product[0].size[0] : null);
  const [items, setItems] = useState(product);

  useEffect(() => {
    if (items.length > 0 && selectedColor === null) {
      setSelectedColor(items[0].color);
    }
    purchase({ color: selectedColor, size: selectedSize});
  }, [items, selectedColor]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    purchase({ color, size: items.find(item => item.color === color).size[0] }); // Set color and current selected size to purchase
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    purchase({ color: selectedColor, size }); // Set color and selected size to purchase
  };

  const selectedColorItem = items.find(item => item.color === selectedColor);
  const disabled = {
    opacity: "0.5",
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
              <div>
                <span>Cantidad disponible: {selectedColorItem.quantity}</span>
              </div>
              <label htmlFor="sizeSelect" className='mt-3'>Selecciona una talla:</label>
              <select
                id="sizeSelect"
                className="form-select"
                onChange={(e) => handleSizeSelection(e.target.value)}
                value={selectedSize || 0}
              >
                {items.map((item, index) => (
                  <option key={index} value={item.size}>
                    {item.size}
                  </option>
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
              <div>
                <span >Cantidad disponible: <span style={{fontWeight: "700"}}>{selectedColorItem.quantity}</span></span>
              </div>
              <label htmlFor="sizeSelect" className='mt-3'>Selecciona una talla:</label>
              <select
                id="sizeSelect"
                className="form-select"
                onChange={(e) => handleSizeSelection(e.target.value)}
                value={selectedSize || 0}
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
