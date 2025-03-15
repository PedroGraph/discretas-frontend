import { useEffect } from "react";
import ItemsCarousel from "./itemscarousel";
import useProductStore from "../stores/productStore";
import { useUserStore } from "../stores/userStore";

export default function RecommendedProducts({ title, section }) {
  const { products, fetchProducts } = useProductStore();
  const { setWishlist, wishlist, getWishlist } = useUserStore();
  
  useEffect(() => {
    fetchProducts({ page: 1 });
    if(section) getWishlist(true);
  }, []);

  return (
    <div className={`${section ? "bg-gray-200 dark:bg-gray-900 h-[100vh]" : "bg-white dark:bg-slate-700"} flex flex-col lg:gap-4 md:p-8 rounded ${section ? "xl:w-100": "xl:max-w-[400px]"}`}>
      <span className={`text-center ${!section && "border-b-[1px]"} dark:text-white ${section ? "xs:text-xl lg:text-4xl font-bold xs:p-8 md:p-4": "text-lg p-4 pb-1"}`}>{title}</span>
      <div className="flex xs:flex-row xl:flex-col">
        <ItemsCarousel items={products} section={section} setWishlist={setWishlist} wishlist={wishlist} />
      </div>
    </div>
  );
}
