import React, { useState, useEffect } from 'react';
import { filtersProduct, getProducts } from '../services/Products';
import useProductContext from '../hooks/useProductContext';
import Slider from '@mui/material/Slider';
import "../css/style_products.css";
import { set } from 'lodash';

const  FilterParams = () => {
  const { setProducts } = useProductContext();
  const [ priceRange, setPriceRange ] = useState([10000, 522000]);
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFilter = async () => {
    setProducts([])
    const filteredProducts = await filtersProduct({ productPrice: priceRange });
    setProducts(filteredProducts);
  }

  return (
    <>
      <p className='text-center font-bold xs:pb-1 lg:pb-2 d-flex items-center gap-0.5 justify-center' onClick={handleOpen}>Filtrar por
      <svg className='xs:block lg:hidden' fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15px" height="15px" viewBox="0 0 36.678 36.678" xmlSpace="preserve">
        <g>
          <path d="M29.694,20.074c0.087,0.16,0.08,0.356-0.02,0.512L19.393,36.449c-0.089,0.139-0.241,0.224-0.406,0.229
            c-0.004,0-0.009,0-0.014,0c-0.159,0-0.31-0.074-0.403-0.206L6.997,20.609c-0.111-0.152-0.127-0.354-0.042-0.521
            s0.258-0.273,0.446-0.273h21.855C29.439,19.814,29.608,19.914,29.694,20.074z M7.401,16.864h21.855c0.007,0,0.013,0,0.02,0
            c0.276,0,0.5-0.224,0.5-0.5c0-0.156-0.069-0.295-0.184-0.387L18.086,0.205C17.989,0.073,17.838,0.009,17.669,0
            c-0.165,0.005-0.315,0.09-0.406,0.228L6.982,16.092c-0.101,0.154-0.107,0.35-0.021,0.511C7.05,16.764,7.218,16.864,7.401,16.864z" />
        </g>
      </svg>
      </p>
      <div className={`d-flex xs:flex-col sm:flex-row lg:flex-col gap-1 xs:px-2 sm:px-0 ${!open ? 'xs:hidden': 'menu-slide-down'}`}>
        <div className={`lg:flex flex-column align-items-end mt-2 xs:w-full sm:w-1/3 lg:w-full p-3 rounded sm:mb-2 ${!open ? 'xs:hidden': 'xs:d-flex'}`}>
          <h1 className='font-bold mb-2 xs:text-xs lg:text-sm text-gray-700 mr-auto'>Rango de precio</h1>
          <Slider
            sx={{
              color: "black", 
              '& .MuiSlider-thumb': { 
                backgroundColor: 'black',
              },
              '& .MuiSlider-track': {  
                backgroundColor: 'black',
              },
              '& .MuiSlider-rail': {  
                backgroundColor: '#cccccc',  
              },
            }}
            value={priceRange}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={10000}
            max={522000}
            step={1000}
          />
          <div className='d-flex justify-between w-full'>
            <input type="number" className='h-8 w-2/6 xs:text-xs lg:text-sm' value={priceRange[0]} onChange={e => setPriceRange([e.target.value, priceRange[1]])}/>
            <input type="number" className='h-8 w-2/6 xs:text-xs lg:text-sm' value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], e.target.value])}/>
          </div>
          <button className='bg-black xs:mt-2 lg:mt-4 py-1 px-3 rounded text-sm' onClick={handleFilter}>Aplicar</button>
        </div>
      </div>
      
    </>
  );
};

export default FilterParams;
