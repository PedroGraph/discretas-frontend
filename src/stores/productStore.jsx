import { create } from 'zustand';
import { getProducts, searchProducts } from "../services/productsService";
import { objectToDatabaseQuery } from "./../utils/formats";

const ITEMS_PER_PAGE = 10;

const initialState = {
  products: [],
  foundProducts: [],
  queryProducts: {},
  searchEngineLoading: false,
  searchEngineMessage: null,
  isLoading: false,
  isError: null,
  currentPage: 1,
  totalPages: 0,
};

const useProductStore = create((set, get) => ({
  ...initialState,

  setQueryProducts: (queryProducts) => set({ queryProducts }),
  setProductFound: (foundProducts) => set({ foundProducts }),
  setCurrentPage: (page) => set({ currentPage: page }),
  
  resetState: () => set(initialState),

  fetchProducts: async ({ page = 1, location = null, query = null }) => {
    set({ isLoading: true, isError: null });
    
    try {
      const response = await getProducts({ page, query });
      
      if (!response.products?.length) {
        throw new Error('No se encontraron productos');
      }

      const filteredProducts = filterProductsByCategory(response.products, location);
      
      set({ 
        products: filteredProducts, 
        isLoading: false,
        totalPages: response.totalPages,
        currentPage: page
      });
    } catch (error) {
      set({ 
        isError: error.message || 'Error al cargar los productos', 
        isLoading: false,
        products: []
      });
    }
  },
  
  searchProducts: async (query) => {
    if (!query) {
      set({ foundProducts: [], searchEngineMessage: null });
      return;
    }

    set({ searchEngineLoading: true, searchEngineMessage: null });
    
    try {
      const fullQuery = objectToDatabaseQuery(query);
      const response = await searchProducts(fullQuery);
      
      if (!response?.length) {
        throw new Error('No se encontraron productos con esa búsqueda');
      }

      set({ 
        foundProducts: response, 
        searchEngineLoading: false,
        searchEngineMessage: null
      });
    } catch (error) {
      set({ 
        searchEngineMessage: error.message || 'Error en la búsqueda',
        searchEngineLoading: false,
        foundProducts: []
      });
    }
  },

  // Utilidades
  clearSearch: () => set({ 
    foundProducts: [], 
    searchEngineMessage: null, 
    searchEngineLoading: false 
  }),

  clearFilters: () => set({ 
    queryProducts: {}, 
    currentPage: 1 
  }),
}));

const filterProductsByCategory = (products, location) => {
  if (!location || (!location.pathname.includes("lubricante") && !location.pathname.includes("lenceria"))) {
    return products;
  }

  return products.filter(product => 
    location.pathname.includes(product.category.toLowerCase())
  );
};

export default useProductStore;