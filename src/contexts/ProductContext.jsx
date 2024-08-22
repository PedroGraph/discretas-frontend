import { createContext, useState, useEffect } from "react";
import axios from "axios";
import firebaseConfig from "../../firebase";
import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const ShoppingProvider = createContext({});

export const ShopProvider = ({ children }) => {
  //Login User
  const [userLogged, setUserLogged] = useState([]);

  const [products, setProducts] = useState([]); //Get all products
  const [filters, setFilters] = useState([]); //Filter al products in products list
  const [sortType, setSortType] = useState("default"); //Set default sort type in products list
  const [lowestPriceProduct, setLowestPriceProduct] = useState(null); //Set default lowest price in products list
  const [highestPriceProduct, setHighestPriceProduct] = useState(null); //Set default highest price in products list
  const [productDetail, setProductDetail] = useState(null); //Set selected product detail
  const [productPurchased, setProductPurchased] = useState(null); //Set default product purchase in product details
  const [orderList, setOrderList] = useState(
    JSON.parse(localStorage.getItem("store")) || []
  ); //Set default product purchase in product details
  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishList")) || []
  );

  const [isLoading, setIsLoading] = useState(false); //Spinner for loading
  const [isComplete, setIsComplete] = useState(false); //Verify if product purchase is complete

  const [isLoadingForm, setIsLoadingForm] = useState(false); //Spinner for loading
  const [isCompleteForm, setIsCompleteForm] = useState(false); //Verify if product purchase is complete

  //Error Section
  const [errorSelectedPayment, setErrorSelectedPayment] = useState(false);

  //Payment section
  const [modalPayment, setModalPayment] = useState(false);

  //Filters section
  const [nameFilter, setNameFilter] = useState("");
  const [starFilter, setStarFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState([]);

  //User Information
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    idt: "",
  });

  //Payment Options
  const [selectedPayment, setSelectedPayment] = useState("Metodo de Pago");

  const [hideFooter, setHideFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [imageModal, setImageModal] = useState("");

  const openImageModal = (image) => {
    console.log(image);
    setImageModal(image);
  };

  const closeImageModal = () => {
    setImageModal(false);
  };

  const userInfo = async () => {
    console.log(userLogged);
    return await axios
      .get(`${__BACKEND_URL__}api/users/getuser/${userLogged}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const loginRouter = ["/login", "/register"];
    setIsMobile(window.innerWidth);
    loginRouter.map((router) => {
      if (router === window.location.pathname) setHideFooter(true);
    });
  }, [hideFooter, isMobile]);

  const canSubmit = formData?.length > 0 && [...Object.values(formData)].every(Boolean);

  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) setUserLogged(user.email);
    });
  }, [userLogged]);

  useEffect(() => {
    axios
      .get(`${__BACKEND_URL__}api/products/all`,)
      .then((response) => {
        setProducts(response.data);
        setFilters(response.data);

        const lowestPrice = response.data.reduce((min, product) => product.price < min.price ? product : min);
        setLowestPriceProduct(lowestPrice);

        const highestPrice = response.data.reduce((max, product) => product.price > max.price ? product : max);
        setHighestPriceProduct(highestPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadMoreProducts = async () =>{
    return await axios
      .post(`${__BACKEND_URL__}products/allProducts`,{
        limit: 8,
        skip: products.length
      })
      .then((response) => {
        const allProducts = [...products, ...response.data]
        setProducts(allProducts);
        setFilters(allProducts);

        const lowestPrice = allProducts.reduce((min, product) => product.price < min.price ? product : min);
        setLowestPriceProduct(lowestPrice);

        const highestPrice = allProducts.reduce((max, product) => product.price > max.price ? product : max);
        setHighestPriceProduct(highestPrice);

        return "ok";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const sortProducts = (sortType) => {
      // Sorting logic based on sortType
      if (sortType === "asc") {
        // Sort alphabetically ascending
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortType === "desc") {
        // Sort alphabetically descending
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortType === "priceAsc") {
        // Sort by price ascending
        return [...products].sort((a, b) => a.price - b.price);
      } else if (sortType === "priceDesc") {
        // Sort by price descending
        return [...products].sort((a, b) => b.price - a.price);
      } else if (sortType === "starsHigh") {
        // Sort by stars high to low
        return [...products].sort((a, b) => b.stars - a.stars);
      } else if (sortType === "starsLow") {
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
    const filteredProducts = filters.filter((product, index) => {
      return (
        (name === "" ||
          product.name.toLowerCase().includes(name.toLowerCase())) &&
        (price === "" || product.price <= parseInt(price)) &&
        (stars === "" || Math.ceil(parseInt(product.stars)) === stars)
      );
    });
    setProducts(filteredProducts);
  };

  const handleAddStore = (product) => {
    let store = JSON.parse(localStorage.getItem("store")) || [];
    const shoppingCart = !product._id ? productPurchased : product;
    let newCart = JSON.parse(localStorage.getItem("store"));

    if (store.length === 0) {
      newCart = [shoppingCart];
    } else {
      const isItemExist =
        store.find(
          (item) =>
            item.size === shoppingCart.size &&
            item.color == shoppingCart.color &&
            item.name === shoppingCart.name
        ) || store.find((item) => item.name === shoppingCart.name);
      if (!isItemExist) newCart = [...store, shoppingCart];

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsComplete(true);

        setTimeout(() => {
          setIsComplete(false);
        }, 1000);
      }, 1000);
    }

    localStorage.setItem("store", JSON.stringify(newCart));
    setOrderList(newCart);
  };

  const handleAddWishList = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const list = !product.id ? productPurchased : product;
    let newWishList = null;

    if (!wishlist || wishlist.length === 0) {
      newWishList = [list];
    } else {
      const isItemExist = wishlist.find((item) => item.id === list.id);
      if (!isItemExist) {
        newWishList = [...wishlist, list];
      } else {
        const index = wishlist.findIndex((item) => item.id === list.id);
        wishlist.splice(index, 1);
        newWishList = wishlist;
      }
    }
    localStorage.setItem("wishlist", JSON.stringify(newWishList));
    setWishList(newWishList);
  };

  const isAddedToWishList = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.find((item) => item.id === productId);
  };

  const handlePayment = (phoneNumber, encodedMessage) => {
    if (selectedPayment === "Metodo de Pago") {
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
        window.open(
          `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`,
          "_blank"
        );
        localStorage.clear();
      }, 1000);
    }, 1000);
  };

  const userDatabase = async (data) => {
    //If the user id exists in data object, it creates a new user otherwise login to the portal
    const url = !data.uid
      ? `${__BACKEND_URL__}api/users/login`
      : `${__BACKEND_URL__}api/users/signup`;
    console.log(url)
    return await axios
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onLogin = async (data) => {
    try {
      return await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          return response.user;
        })
        .catch((err) => {
          return err;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      return await firebaseConfig
        .auth()
        .signInWithPopup(googleProvider)
        .then((response) => {
          return response.user;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitWithFacebook = async () =>{
    try{
      const facebookProvider = new FacebookAuthProvider();
      return await firebaseConfig
        .auth()
        .signInWithPopup(facebookProvider)
        .then((response) => {
          return response.user;
        })
        .catch((error) => {
          return error;
        });
    }catch(error) {
      console.error(error);
    }
  }

  const onSubmitRegister = async (data) => {
    try {
      return await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then((response) => {
          const userId = response.user.uid;
          data.uid = userId;
          userDatabase(data)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              return error;
            });
        })
        .catch((err) => {
          return err;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const validateEmail = (value) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return value.match(validRegex);
  };

  const validateData = (data) => {
    const {phone, ...requiredFields} = data;
    if(![...Object.values(requiredFields)].every(Boolean)) return { data: false, message: "Rellena todos los campos"}
    if(!validateEmail(data.email)) return { data: false, message: "Email inválido" };
    if(data.password !== data.repeat_password) return { data: false, message: "La contraseña no es la misma" };
    return { data: true }
  }


  return (
    <ShoppingProvider.Provider
      value={{
        userLogged,
        setUserLogged,

        products,
        setProducts,
        loadMoreProducts,
        filters,
        setFilters,
        sortType,
        setSortType,
        lowestPriceProduct,
        setLowestPriceProduct,
        highestPriceProduct,
        setHighestPriceProduct,
        productDetail,
        setProductDetail,
        productPurchased,
        setProductPurchased,
        isLoading,
        setIsLoading,
        isComplete,
        setIsComplete,
        isLoadingForm,
        setIsLoadingForm,
        isCompleteForm,
        setIsCompleteForm,
        handleFilter,

        errorSelectedPayment,
        setErrorSelectedPayment,

        modalPayment,
        setModalPayment,

        nameFilter,
        setNameFilter,
        starFilter,
        setStarFilter,
        priceFilter,
        setPriceFilter,

        formData,
        setFormData,
        canSubmit,

        handlePayment,
        selectedPayment,
        setSelectedPayment,

        orderList,
        setOrderList,
        wishList,
        setWishList,
        handleAddStore,
        handleAddWishList,
        isAddedToWishList,

        userDatabase,

        isMobile,
        hideFooter,

        imageModal,
        closeImageModal,
        openImageModal,

        onLogin,
        onSubmitWithGoogle,
        onSubmitWithFacebook,
        onSubmitRegister,

        userInfo,
        validateEmail,
        validateData,
      }}
    >
      {children}
    </ShoppingProvider.Provider>
  );
};

export default ShoppingProvider;
