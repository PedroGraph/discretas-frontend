import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

const ResponsiveFilterSidebar = ({ categories, sizes, colors, filters, setFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleFilterValue = (filterKey, value) => {
    if (filters[filterKey] === value) {
      const newFilters = { ...filters };
      delete newFilters[filterKey];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [filterKey]: value });
    }
  };

  const handleApplyFilters = () => {
    const queryString = Object.entries(filters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    window.location.href = `/tienda${queryString && "?" + queryString}`;
  };

  const FilterContent = () => (
    <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Filtros</h2>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFilter();
          }} 
          className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mb-6 flex flex-col">
        <h3 className="font-medium mb-2 dark:text-white">Categorías</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category}
              className="hidden"
              onClick={(e) => e.stopPropagation()}
            />
            <label
              htmlFor={category}
              className={`flex items-center cursor-pointer text-sm px-3 py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-500 ${filters?.category === category ? "bg-purple-600 text-white" : "dark:text-white bg-gray-100 dark:bg-gray-600 "}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFilterValue('category', category);
              }}
            >
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2 dark:text-white">Tallas</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                toggleFilterValue('size', size);
              }}
              className={`px-3 py-2 border rounded-lg text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-700 shadow-sm transition hover:bg-gray-100 dark:hover:bg-gray-600 ${filters?.size === size ? "ring-2 ring-purple-500" : "border-gray-300 dark:border-gray-500"}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2 dark:text-white">Colores</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={`h-8 w-8 rounded-lg shadow-sm transition ${filters?.color === color ? "ring-2 ring-purple-500" : "border border-gray-300 dark:border-gray-500"}`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFilterValue('color', color);
              }}
            >
            </button>
          ))}
        </div>
      </div>

      <button 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition active:scale-95" 
        onClick={(e) => {
          e.stopPropagation();
          handleApplyFilters();
        }}
      >
        Aplicar Filtros
      </button>
    </div>
  );

  return (
    <>
    
      <div className="fixed bottom-8 right-4 lg:hidden z-20">
        <button
          onClick={toggleFilter}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition active:scale-95"
        >
          <SlidersHorizontal size={24} />
        </button>
      </div>
    
      <aside className="hidden lg:block w-1/4 px-0">
        <FilterContent />
      </aside>
    
      {isFilterOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleFilter}
          ></div>
          <div 
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden transform transition-transform duration-300 ease-in-out animate-slide-up" 
          >
            <div className="max-h-[80vh] overflow-y-auto rounded-t-xl">
              <FilterContent />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResponsiveFilterSidebar;