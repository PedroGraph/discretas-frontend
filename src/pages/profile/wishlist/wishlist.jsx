import { currencyFormat } from "../../../utils/formats";
import { Heart } from "lucide-react";

export default function Wishlist({ wishlist, setWishlist }) {

    if (wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center xs:gap-4 lg:gap-0 h-[50vh] text-gray-600 dark:text-gray-200">
                <Heart className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <h2 className="text-lg font-semibold">Tu lista de deseos está vacía</h2>
                <p className="xs:text-xs lg:text-sm text-gray-500 text-center dark:text-gray-400">
                    Agrega tus productos favoritos para encontrarlos fácilmente más tarde.
                </p>
            </div>
        );
    }

    return (
        <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white">Lista de Deseos</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-200">
                        Gestiona tus productos favoritos
                    </span>
                </div>
                <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {wishlist.length > 0 && wishlist.map((product, index) => (
                        <div key={index} className="flex flex-col relative">
                            <img
                                src={product?.products?.images[0]?.imageName}
                                alt="product_image"
                                className="w-full xs:h-[100px] lg:h-[200px] rounded-t-lg object-cover cursor-pointer"
                                onClick={() =>
                                    window.location.href = `/${product?.products?.category}/${product?.products?.name}_${product?.products?.id}`
                                }
                            />
                            <div className="bg-white p-4">
                                <h1
                                    className="xs:text-xs lg:text-sm text-black line-clamp-1 cursor-pointer"
                                    onClick={() =>
                                        window.location.href = `/${product?.products?.category}/${product?.products?.name}_${product?.products?.id}`
                                    }
                                >
                                    {product?.products?.name}
                                </h1>
                                <p className="xs:text-sm lg:text-lg font-bold text-gray-600">
                                    {currencyFormat(product?.products?.price)}
                                </p>
                            </div>
                            <button className="bg-[#8941ff] xs:text-xs lg:text-base text-white p-2 rounded-b-lg">
                                Añadir a la cesta
                            </button>
                            <div
                                className="bg-[#8941ff] absolute top-2 right-2 shadow-md rounded-full flex gap-2 p-2 items-center cursor-pointer hover:bg-white"
                                onClick={() => setWishlist(product?.products)}
                            >
                                <Heart className="xs:w-3 xs:h-3 lg:w-5 lg:h-5 text-white fill-[#8941ff] hover:text-[#8941ff]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}
