import PropTypes from 'prop-types';
import { useProductDetails } from '../hooks/useProductDetails';
import ProductImage from '../imagescarousel';
import ProductInfo from './ProductInfo';
import ProductDescription from './ProductDescription';
import RelatedProducts from './RelatedProducts';

const ProductDetails = ({ productId }) => {
  const { product, loading, error } = useProductDetails(productId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ProductImage images={product.images} className={"rounded max-w-[600px] w-full xs:h-[400px] lg:h-[600px] object-cover"}/>
      <ProductInfo
        name={product.name}
        description={product.description}
        price={product.price}
        quantity={1}
        onAddToCart={() => {}}
      />
      <ProductDescription description={product.description} />
      <RelatedProducts productId={product.id} />
    </div>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetails;