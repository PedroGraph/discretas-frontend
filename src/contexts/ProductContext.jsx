import { createContext, useState, useEffect } from "react";
import axios from "axios";
import firebaseConfig from '../../firebase';

const ShoppingProvider = createContext({});

export const ShopProvider = ({ children }) => {

  //Login User
  const [userLogged, setUserLogged] = useState([]);

  const [products, setProducts] = useState([]); //Get all products
  const [filters, setFilters] = useState([]); //Filter al products in products list
  const [sortType, setSortType] = useState('default'); //Set default sort type in products list
  const [lowestPriceProduct, setLowestPriceProduct] = useState(null); //Set default lowest price in products list
  const [highestPriceProduct, setHighestPriceProduct] = useState(null); //Set default highest price in products list
  const [productDetail, setProductDetail] = useState(null); //Set selected product detail
  const [productPurchased, setProductPurchased] = useState(null); //Set default product purchase in product details
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('store')) || []); //Set default product purchase in product details
  
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

  //Payment Options
  const [selectedPayment, setSelectedPayment] = useState('Metodo de Pago');

  const [hideFooter, setHideFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [imageModal, setImageModal] = useState('');

  const openImageModal = (image) => {
    console.log(image);
    setImageModal(image);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };
  

  useEffect(() => {
    
    const loginRouter = ['/login', '/register'];
    setIsMobile(window.innerWidth);
    loginRouter.map(router => {
      if(router === window.location.pathname) setHideFooter(true);
    });

  },[hideFooter, isMobile]);

  const canSubmit = [...Object.values(formData)].every(Boolean) ;

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) =>{
      if(user) setUserLogged(user.uid)
      // else setUserLogged([])
    })
  },[userLogged]);

  useEffect(() => {
     axios
      .get(`${__BACKEND_URL__}products/`)
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
    // console.log(product.stars)
      return (
        (name === '' ||
          product.name.toLowerCase().includes(name.toLowerCase())) &&
        (price === '' || product.price <= parseInt(price)) &&
        (stars === '' || product.stars == stars)
      );
    });
    setProducts(filteredProducts);
  };

  const handleAddStore = (product) => {
    let store = JSON.parse(localStorage.getItem('store')) || [] ;
    const shoppingCart = !product._id ? productPurchased : product;
    if(!store || store.length === 0) {
      localStorage.setItem('store',JSON.stringify([shoppingCart]));
      setOrderList([shoppingCart]);
      return;
    }else{
      const isItemExist   = !store.find(item => item.size === shoppingCart.size && item.color == shoppingCart.color && item.name === shoppingCart.name) || !store.find(item =>item.name === shoppingCart.name) ? false : true ;
      if(!isItemExist) {
        localStorage.setItem('store',JSON.stringify([...store, shoppingCart]));
        setOrderList([...store, shoppingCart]);
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);

      setTimeout(() => {
        setIsComplete(false);
      }, 1000);
    }, 1000);
  }

  const handlePayment = (phoneNumber, encodedMessage) => {
    if(selectedPayment === 'Metodo de Pago') {
        setErrorSelectedPayment(true);
          return;
      }
      setIsLoadingForm(true);
      setTimeout(() => {
          setIsLoadingForm(false);
          setIsCompleteForm(true);
          setTimeout(() => {
            setModalPayment(false);
            setIsCompleteForm(false);
            window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
            localStorage.clear();
          }, 1000);
      }, 1000);
  };
  

  const userDatabase = async (data) =>{

    //If the user id exists in data object, it creates a new user otherwise login to the portal
    const url = !data.uid ? `${__BACKEND_URL__}users/login` : `${__BACKEND_URL__}users/register`;

    return await axios.post(url,data)
    .then((response) =>{
      return response;
    })
    .catch((err) =>{
      console.log(err);
    });

  }


  return (
    <ShoppingProvider.Provider
      value={{
        userLogged, setUserLogged,

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

        handlePayment, 
        selectedPayment, setSelectedPayment,

        orderList, setOrderList,
        handleAddStore,

        userDatabase,

        isMobile,
        hideFooter,

        imageModal,
        closeImageModal,
        openImageModal

      }}
    >
      {children}
    </ShoppingProvider.Provider>
  );
};

export default ShoppingProvider;