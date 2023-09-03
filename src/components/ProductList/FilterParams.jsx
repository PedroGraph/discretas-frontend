import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Range } from "react-range";
import "../css/style_products.css";
import useProductContext from '../hooks/useProductContext';
import Currency from '../common/CurrencyFormater'

const  FilterParams = ({ onFilter, lower, higher }) => {

  const {
    nameFilter, setNameFilter,
    starFilter, setStarFilter,
    priceFilter, setPriceFilter
  } = useProductContext();

  const [priceFiltered, setPriceFiltered] = useState([lower.price] < priceFilter ? priceFilter : [lower.price]);

  useEffect(() => {
    setPriceFilter(lower.price); 
  }, [lower.price]);

  const handleNameChange = (e) => {
    console.log(e)
    setNameFilter(e.target.value);
    onFilter({ name: e.target.value, price: priceFilter === lower.price ? '' : priceFilter, stars: starFilter > 0 ? starFilter : ''});
  };

  const handlePriceChange = values => {
    const value = values[0] > lower.price ? values[0] : '';
    const filter = { name: nameFilter, price: value, stars: starFilter > 0 ? starFilter : ''};
    setPriceFilter(value > 0 ? value : lower.price);
    if(priceFilter > 0) setPriceFiltered(value)
    onFilter(filter);
  };

  const handleStarChange = value => {
    setStarFilter(value);
    onFilter({ name: nameFilter, price: priceFilter === lower.price ? '' : priceFilter, stars: value > 0 ? value : '' });
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
        <span className='span-filter'>Filtrar por nombre:</span>
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameChange}
          style={{width: "100%", borderRadius: "5px", height: "25px"}}
        />
      </div>
      <div className="number-control mt-2">
        <span className='span-filter'>Filtrar por precio:</span>
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
            values={[priceFiltered]}
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
        <span className='span-filter'>Filtrar por calificación:</span>
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
