import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Range } from "react-range";
import "../css/style_products.css"
import Currency from './CurrencyFormater'

const  FilterParams = ({ onFilter, lower, higher }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([lower.price]);
  const [starFilter, setStarFilter] = useState(0);

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
    onFilter({ name: e.target.value, price: priceFilter > lower.price ? priceFilter : '', stars: starFilter});
  };

  const handlePriceChange = values => {
    const value = values[0] > lower.price ? values[0] : '';
    const filter = { name: nameFilter, price: value, stars: starFilter};
    setPriceFilter(value > 0 ? value : lower.price);
    onFilter(filter);
  };

  const handleStarChange = value => {
    setStarFilter(value);
    onFilter({ name: nameFilter, price: priceFilter > lower.price ? priceFilter : '', stars: value });
  };

  const handleStarClick = selectedStars => {
    if (selectedStars === starFilter) {
      handleStarChange(0);
      setStarFilter(0);
    } else {
      handleStarChange(selectedStars);
      setStarFilter(selectedStars);
    }
  };

  return (
    <>
        <div>
        <span>Filtrar por nombre:</span>
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameChange}
          style={{width: "100%", borderRadius: "5px"}}
        />
      </div>
      <div className="number-control mt-2">
        <span>Filtrar por precio:</span>
        <div className="range-indicators">
        </div>
        <div className="number-bar">
          {
            priceFilter > lower.price ? (
              <div className="number-pointer" style={{ left: `calc(${(priceFilter / higher.price) * 100}% - 8px)` }}>
                <Currency amount={priceFilter}/>
              </div>
            ):(
              ""
            )
          }
        
        </div>
        <Range
          step={25000}
          min={lower.price}
          max={higher.price}
          values={[priceFilter]}
          onChange={handlePriceChange}
          renderTrack={({ props, children }) => (
            <div {...props} className="track">
              {children}
            </div>
          )}
          renderThumb={({ props }) => <div {...props} className="thumb" />}
        />
        <div className='price-filter mt-2' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>$<Currency amount={lower.price}/></span>
          <span>$<Currency amount={higher.price}/></span>
        </div>
      </div>
      <div className="star-filter mt-2">
        <span>Filtrar por valoración:</span>
        <div className="star-options">
          {[1, 2, 3, 4, 5].map(stars => (
            <span
              key={stars}
              className={`star ${stars <= starFilter ? 'selected' : ''}`}
              onClick={() => handleStarClick(stars)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterParams;
