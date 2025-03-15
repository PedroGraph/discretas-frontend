import { useEffect, useState, useCallback, memo } from "react";
import LoaderCard from "../../components/loaderCard";
import ErrorPage from "../../components/errorProducts";
import ProductCard from "../../components/productcard";
import useProductStore from "../../stores/productStore";
import { useUserStore } from "../../stores/userStore";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import Filters from "./filters";
import Navigator from "./navigator";

const MemoizedFilters = memo(Filters);
const MemoizedNavigator = memo(Navigator);
const MemoizedProductCard = memo(ProductCard);

export default function ProductSection() {
  const location = useLocation();
  const {
    products,
    isLoading,
    isError,
    fetchProducts,
    currentPage,
    totalPages,
    setCurrentPage,
    setQueryProducts,
    queryProducts,
  } = useProductStore();

  const { wishlist, getWishlist, setWishlist } = useUserStore();
  const [listOrGrid, setListOrGrid] = useState("list");

  useEffect(() => {
    const loadProducts = async () => {
      const parameters = new URLSearchParams(location.search);
      const query = {
        ...(parameters.get("size") && { size: parameters.get("size") }),
        ...(parameters.get("color") && { color: parameters.get("color") }),
        ...(parameters.get("category") && { category: parameters.get("category") })
      };
      
      setQueryProducts(query);
      await fetchProducts({ page: currentPage, location, query });
      await getWishlist(true);
    };

    loadProducts();
  }, [currentPage, location, setQueryProducts, fetchProducts, getWishlist]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    fetchProducts({ page, location });
  }, [setCurrentPage, fetchProducts, location]);

  const handleGridClick = useCallback(() => setListOrGrid("grid"), []);
  const handleListClick = useCallback(() => setListOrGrid("list"), []);

  const categories = ["Lubricante", "Lenceria"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["black", "white", "red", "blue", "green"];

  if (isError) return <ErrorPage />;

  return (
    <main className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 min-h-screen">
      <div className="items-center justify-end gap-4 w-full xs:hidden lg:px-10 lg:py-4 lg:flex">
        <LayoutGrid
          className={`w-8 h-8 dark:text-white border-2 rounded cursor-pointer p-1 ${
            listOrGrid === "list"
              ? "border-gray-400"
              : "border-[#8941ff] bg-[#8941ff]"
          }`}
          onClick={handleGridClick}
        />
        <List
          className={`w-8 h-8 dark:text-white border-2 rounded cursor-pointer p-1 ${
            listOrGrid === "list"
              ? "border-[#8941ff] bg-[#8941ff]"
              : "border-gray-400"
          }`}
          onClick={handleListClick}
        />
      </div>
      <div className="flex lg:flex-row xs:flex-col w-full xs:py-4 lg:py-0 lg:px-8 gap-4">
        <MemoizedFilters
          categories={categories}
          sizes={sizes}
          colors={colors}
          setFilters={setQueryProducts}
          filters={queryProducts}
        />
        {isError ? (
          <ErrorPage />
        ) : isLoading ? (
          <LoaderCard listOrGrid={listOrGrid} cards={6} />
        ) : (
          <MemoizedProductCard
            products={products}
            listOrGrid={listOrGrid}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        )}
      </div>

      {totalPages > 1 && (
        <MemoizedNavigator
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </main>
  );
}

ProductSection.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
};