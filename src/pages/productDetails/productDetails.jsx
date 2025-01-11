import ImagesCarousel from "../../components/imagescarousel";
import { lazy, Suspense } from "react";
import { useProductDetails } from "../../hooks/useProductDetails";
import Loader from "../../components/loader";
import ProductInfo from "../../components/ProductDetails/ProductInfo";

export default function ProductDetails() {
  const Modal = lazy(() => import('../../components/modal'));
 
  const { productDetails, loading, error, selectedCharactetiristic, modal, setModal, setSelectedCharactetiristic } = useProductDetails();

  if (loading) return <div className="w-full h-screen flex justify-center items-center"><Loader /></div>;
  if (error) return <div>Error al cargar los detalles del producto</div>;
  if (!productDetails) return <div>No se encontraron los detalles del producto</div>;

  return (
    <div className="flex xs:flex-col xs:items-center lg:items-stretch lg:flex-row lg:justify-center w-full h-screen xs:bg-white lg:bg-gray-200">
      <div className="flex flex-col bg-white xs:w-full sm:w-1/2 lg:w-2/6 xs:p-4 lg:p-10">
        <ImagesCarousel images={productDetails.images} />    
      </div>
      <div className="flex flex-col xs:gap-4 lg:gap-6 lg:w-2/6 xs:w-full bg-white xs:pt-4 xs:px-4 lg:pt-10">
        <ProductInfo 
        productDetails={productDetails}
        selectedCharactetiristic={selectedCharactetiristic} 
        setSelectedCharactetiristic={setSelectedCharactetiristic} 
        setModal={setModal}
        />
      </div>
      {
        modal && 
          <Suspense fallback={<div>Loading...</div>}>
            <Modal product={selectedCharactetiristic} setModal={setModal} setSelectedCharactetiristic={setSelectedCharactetiristic}/>
          </Suspense>
      }
    </div>
  );
}