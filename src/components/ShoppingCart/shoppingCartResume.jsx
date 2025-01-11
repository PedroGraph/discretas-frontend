import PropTypes from "prop-types";
import ShoppingCartItems from "./shoppingCartItems";
import FinishPurchaseCart from "./TotalPurchase";
import RecommendedProducts from "./RecommendedProducts";

export default function ShoppingCartResume({
  products,
  handleTotal,
  updateQuantity,
  deleteProduct,
  handleSubtotal,
  handleDiscount,
  createNewOrder,
}) {
  return (
    <section
      className={`w-full bg-gray-200 flex ${
        products.length > 0 && products.length < 4 && "h-screen"
      } justify-center`}
    >
      <div className="xs:w-full lg:w-[90%] flex xs:flex-col justify-center lg:flex-row bg-gray-200 py-4 gap-2 mb-12">
        <div className="xs:w-full lg:w-[80%] max-w-[2000px] flex flex-col gap-2">
          <ShoppingCartItems
            products={products}
            updateQuantity={updateQuantity}
            deleteProduct={deleteProduct}
          />
        </div>
        <div className="rounded xs:w-full lg:w-[20%]  flex flex-col gap-2">
          <FinishPurchaseCart
            products={products}
            createNewOrder={createNewOrder}
            handleSubtotal={handleSubtotal}
            handleDiscount={handleDiscount}
            handleTotal={handleTotal}
          />
          <RecommendedProducts />
        </div>
      </div>
    </section>
  );
}

ShoppingCartResume.propTypes = {
  products: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  createNewOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  handleSubtotal: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  handleDiscount: PropTypes.func.isRequired,
};
