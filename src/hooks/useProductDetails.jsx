import { useState, useEffect } from "react";
import { extractProductId } from "../utils/formats";
import { getProduct } from "../services/productsService";
import { useLocation } from "react-router-dom";

export const useProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const [selectedCharactetiristic, setSelectedCharactetiristic] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const navigationState = location.state?.productDetails;

    if (navigationState) {
      setProductDetails(navigationState);
      console.log(navigationState)
      setSelectedCharactetiristic({
        color: navigationState.characteristics[0].color,
        size: navigationState.characteristics[0].sizes[0].size,
        quantity: 1,
        ...navigationState
      });
      setLoading(false);
    } else {
      const fetchProductDetails = async () => {
        try {
          const productId = extractProductId(location.pathname);
          const fetchedProductDetails = await getProduct(productId);
          setProductDetails(fetchedProductDetails);
          setSelectedCharactetiristic({
            color: fetchedProductDetails.characteristics[0].color,
            size: fetchedProductDetails.characteristics[0].sizes[0].size,
            quantity: 1,
            ...fetchedProductDetails
          });
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [location.pathname, location.state]);

  useEffect(() => {
    document.title = productDetails && productDetails.name;
  }, [productDetails]);

  return { productDetails, loading, error, selectedCharactetiristic, modal, setModal, setSelectedCharactetiristic };
};
