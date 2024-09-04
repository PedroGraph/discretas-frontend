import { useState, useEffect, useRef, useCallback } from 'react';
import { SearchIcon, XIcon } from "lucide-react";
import { filtersProduct } from '../services/Products';
import debounce from 'lodash/debounce';

// Función para obtener sugerencias de productos
const fetchProductsSuggestions = async (query) => {
  return await filtersProduct({ productName: query });
};

export default function Component() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Caché local para almacenar sugerencias
  const cache = useRef({});

  // Función debounced para buscar sugerencias
  const fetchSuggestions = useCallback(
    debounce(async (input) => {
      if (cache.current[input]) {
        setSuggestions(cache.current[input]);
        return;
      }

      const fetchedSuggestions = await fetchProductsSuggestions(input);
      cache.current[input] = fetchedSuggestions.map(suggestion => suggestion.name);
      setSuggestions(cache.current[input]);
    }, 300),
    []
  );

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions(query);  
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, fetchSuggestions]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const searchProducts = () => {
    if (!query) return (window.location.href = `/productos`);
    window.location.href = `/productos?productName=${query}`;
  };

  return (
    <div className="xl:bg-black transition-colors duration-300">
      <div className="relative max-w-[600px] w-full lg:p-4 xs:p-0">
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={handleInputChange}
            className="flex-grow rounded-r-none border-r-0 border-gray-300 px-4 py-2 focus:outline-none hidden lg:block lg:bg-white lg:text-black"
          />
          <button
            className=" xs:hidden lg:block rounded-l-none rounded-r-full xs:bg-black lg:bg-orange-500 hover:bg-orange-600 xs:p-0 lg:px-4 lg:py-2 text-white"
            onClick={searchProducts}
          >
            <SearchIcon className="xs:h-6 xs:w-7 lg:h-4 lg:w-4" />
          </button>
          <button
            className="xs:block lg:hidden ml-auto rounded-l-none rounded-r-full xs:bg-black lg:bg-orange-500 hover:bg-orange-600 xs:p-0 lg:px-4 lg:py-2 text-white"
            onClick={toggleFullScreen}
          >
            <SearchIcon className="xs:h-6 xs:w-7 lg:h-4 lg:w-4" />
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 && !isFullScreen && (
          <ul className="absolute max-w-[570px] w-full z-10  bg-white xl:bg-gray-800 border border-gray-300 xl:border-gray-700 mt-1 rounded-md shadow-lg">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 xl:hover:bg-gray-300 cursor-pointer xl:text-black border-t-[1px] border-gray-300"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
            <li
              className="px-4 py-2 hover:bg-gray-100 xl:hover:bg-gray-300 cursor-pointer border-t-[1px] border-gray-300 text-center text-gray-500"
              onClick={searchProducts}
            >
              Ver todos los resultados
            </li>
          </ul>
        )}
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 bg-white z-50 p-4 flex flex-col items-center">
          <div className="w-full max-w-2xl mt-8 relative">
            <div className="flex">
            <button
                className="xs:block lg:hidden rounded-l-none rounded-r-full bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white"
                onClick={toggleFullScreen}
              >
                <XIcon className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={handleInputChange}
                className="flex-grow rounded-r-none border-r-0 border-gray-300 px-4 py-2 focus:outline-none"
                autoFocus
              />
            <button className='bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs text-white ml-auto' onClick={searchProducts}>Buscar producto</button>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="w-full bg-white border border-gray-300 rounded-md shadow-lg absolute top-10">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
