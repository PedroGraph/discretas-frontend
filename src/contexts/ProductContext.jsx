import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ShoppingProvider = createContext({});

export const ShopProvider = ({ children }) => {

  const [products, setProducts] = useState([]); //Get all products
  const [filters, setFilters] = useState([]); //Filter al products in products list
  const [sortType, setSortType] = useState('default'); //Set default sort type in products list
  const [lowestPriceProduct, setLowestPriceProduct] = useState(null); //Set default lowest price in products list
  const [highestPriceProduct, setHighestPriceProduct] = useState(null); //Set default highest price in products list
  const [productDetail, setProductDetail] = useState(null); //Set selected product detail
  const [productPurchased, setProductPurchased] = useState(null); //Set default product purchase in product details
  
  const [isLoading, setIsLoading] = useState(false); //Spinner for loading
  const [isComplete, setIsComplete] = useState(false); //Verify if product purchase is complete

  const [isLoadingForm, setIsLoadingForm] = useState(false); //Spinner for loading
  const [isCompleteForm, setIsCompleteForm] = useState(false); //Verify if product purchase is complete

  //Error Section
  const [errorSelectedPayment, setErrorSelectedPayment] = useState(false);

  //Payment section
  const [modalPayment, setModalPayment] = useState(false);

  //Filters section
  const [nameFilter, setNameFilter] = useState('');
  const [starFilter, setStarFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);

  //User Information
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    cedula: '',
    correo: '',
  });

  const canSubmit = [...Object.values(formData)].every(Boolean) ;

  useEffect(() => {
     axios
      .get(`https://discretas-backend.onrender.com/products/`)
      .then((response) => {
        setProducts(response.data);
        setFilters(response.data);

        const lowestPrice = response.data.reduce((min, product) =>
          product.price < min.price ? product : min
        );
        setLowestPriceProduct(lowestPrice);

        const highestPrice = response.data.reduce((max, product) =>
          product.price > max.price ? product : max
        );
        setHighestPriceProduct(highestPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const sortProducts = (sortType) => {
      // Sorting logic based on sortType
      if (sortType === 'asc') {
        // Sort alphabetically ascending
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortType === 'desc') {
        // Sort alphabetically descending
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortType === 'priceAsc') {
        // Sort by price ascending
        return [...products].sort((a, b) => a.price - b.price);
      } else if (sortType === 'priceDesc') {
        // Sort by price descending
        return [...products].sort((a, b) => b.price - a.price);
      } else if (sortType === 'starsHigh') {
        // Sort by stars high to low
        return [...products].sort((a, b) => b.stars - a.stars);
      } else if (sortType === 'starsLow') {
        // Sort by stars low to high
        return [...products].sort((a, b) => a.stars - b.stars);
      } else {
        // Default sorting
        return [...products];
      }
    };

    setProducts(sortProducts(sortType));
  }, [sortType]);

  const handleFilter = ({ name, price, stars }) => {
    console.log(name, price, stars);
    const filteredProducts = filters.filter((product) => {
      return (
        (name === '' ||
          product.name.toLowerCase().includes(name.toLowerCase())) &&
        (price === '' || product.price <= parseInt(price)) &&
        (stars === 0 || product.stars === stars)
      );
    });
    setProducts(filteredProducts);
  };
  
  return (
    <ShoppingProvider.Provider
      value={{
        products, setProducts,
        filters, setFilters,
        sortType, setSortType,
        lowestPriceProduct, setLowestPriceProduct,
        highestPriceProduct, setHighestPriceProduct,
        productDetail, setProductDetail,
        productPurchased, setProductPurchased,
        isLoading, setIsLoading,
        isComplete, setIsComplete,
        isLoadingForm, setIsLoadingForm,
        isCompleteForm, setIsCompleteForm,
        handleFilter,

        errorSelectedPayment, setErrorSelectedPayment,

        modalPayment, setModalPayment,

        nameFilter, setNameFilter,
        starFilter, setStarFilter,
        priceFilter, setPriceFilter,

        formData, setFormData,
        canSubmit,

      }}
    >
      {children}
    </ShoppingProvider.Provider>
  );
};

export default ShoppingProvider;