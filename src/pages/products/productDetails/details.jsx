import { lazy, Suspense, useEffect, memo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useProductDetailsStore } from "../../../stores/detailsProductsStore";
import ImagesCarousel from "../../../components/imagescarousel";
import Loader from "../../../components/loader";
import ProductInfo from "../../../components/ProductDetails/ProductInfo";
import ProductNotFound from "../../../components/ProductDetails/productNotFound";

// Memoizar componentes
const MemoizedImagesCarousel = memo(ImagesCarousel);
const MemoizedProductInfo = memo(ProductInfo);
const Modal = lazy(() => import("../../../components/modal"));

const LoadingSpinner = () => (
  <div className="w-full h-screen flex justify-center items-center dark:bg-gray-900">
    <Loader />
  </div>
);

export default function ProductDetails() {
  const location = useLocation();
  const {
    productDetails,
    loading,
    error,
    selectedCharacteristic,
    modal,
    setModal,
    handleCharacteristics,
    fetchProductDetails,
    handleAddProductToCart,
    isDone,
    loadingButton,
    errorButton
  } = useProductDetailsStore();

  useEffect(() => {
    if (location.pathname) {
      fetchProductDetails(location.pathname, location.state?.productDetails);
    }
  }, [location.pathname, location.state, fetchProductDetails]);

  const handleModalClose = useCallback(() => setModal(false), [setModal]);
  
  const handleProductCharacteristics = useCallback((characteristic) => {
    handleCharacteristics(characteristic);
  }, [handleCharacteristics]);

  const handleCartAddition = useCallback(async (product) => {
    await handleAddProductToCart(product);
  }, [handleAddProductToCart]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ProductNotFound />;
  if (!productDetails) {
    return (
      <div className="w-full h-screen flex justify-center items-center dark:bg-gray-900">
        No se encontraron los detalles del producto
      </div>
    );
  }

  return (
    <div className="flex xs:flex-col xs:items-center lg:items-stretch lg:flex-row lg:justify-center w-full h-screen xs:bg-white xs:dark:bg-gray-900 lg:bg-gray-200 mb-[90px]">
      <div className="flex flex-col bg-white xs:w-full sm:w-1/2 lg:w-3/6 xs:p-4 lg:p-10">
        <MemoizedImagesCarousel 
          images={productDetails.images} 
          subImages={true} 
          className="rounded w-full xs:h-[400px] lg:h-[600px]" 
        />    
      </div>
      <div className="flex flex-col xs:gap-4 lg:w-2/6 xs:w-full bg-white xs:py-4 xs:px-4 lg:pt-10 lg:pl-10 dark:bg-slate-700">
        <MemoizedProductInfo 
          productDetails={productDetails}
          handleCharacteristics={handleProductCharacteristics}
          selectedCharacteristic={selectedCharacteristic} 
          handleAddProductToCart={handleCartAddition}
          isDone={isDone}
          loadingButton={loadingButton}
          errorButton={errorButton}
          setModal={setModal}
        />
      </div>
      {modal && (
        <Suspense fallback={<LoadingSpinner />}>
          <Modal 
            product={selectedCharacteristic} 
            setModal={handleModalClose} 
            setSelectedCharacteristic={handleCharacteristics} 
          />
        </Suspense>
      )}
    </div>
  );
}