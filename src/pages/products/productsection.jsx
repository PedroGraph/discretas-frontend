import { Suspense, lazy, useState, useEffect } from "react";
import LoaderCard from "../../components/loaderCard";
import ErrorPage from "../../components/error";
import { getProducts } from "../../services/productsService";
import PropTypes from 'prop-types';
export default function ProductSection() {

    const [products, setProducts] = useState([]);
    const [isError, setIsError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getProducts().then((response) => {
            setIsLoaded(true);
            if(response.length === 0) setIsError(true)
            else setProducts(response);
        }).catch((error) => {
            setIsError(error);
        }).finally(() => {
            setIsLoaded(false);
        });
    }, []);

    useEffect(() => {
        document.title = "Tienda";
    }, []);
    

    const ProductCard = lazy(() => import("../../components/productcard"));

    return (
        <div className="flex flex-col items-center bg-white">
        <div className="bg-gray-200 py-2 px-4 w-full flex justify-between">
            <span className="xs:text-[12px] lg:text-sm font-normal flex items-center">Productos más populares</span>
            <select className="w-full h-8 border rounded max-w-[170px] xs:text-[12px] lg:text-sm font-normal">
            <option value="" className="text-black font-normal" hidden selected>
                Ordenar por
            </option>
            <option value="productPrice-DESC" className="text-black font-normal">
                Precio: Mayor a menor
            </option>
            <option value="productPrice-ASC" className="text-black font-normal">
                Precio: Menor a mayor
            </option>
            <option value="productName-ASC" className="text-black font-normal">
                Nombre: A-Z
            </option>
            <option value="productName-DESC" className="text-black font-normal">
                Nombre: Z-A
            </option>
            <option value="productPopular-ASC" className="text-black font-normal">
                Más populares
            </option>
            </select>
        </div>
        <div className="flex flex-col w-full justify-center gap-1 p-2">
            {
                isError ? <ErrorPage/>
                : isLoaded && !isError ? <LoaderCard cards={6}/>
                : (
                    <Suspense fallback={<LoaderCard cards={6} />}>
                        <ProductCard products={products} />
                    </Suspense>
                )
            }
        </div>
        </div>
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
        category: PropTypes.string.isRequired
      })
    )
}