import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Currency from '../common/CurrencyFormater';
// import { ProductListTools } from '../hooks/ProductList/ProductList';
import { useLocation  } from 'react-router-dom';
import { filtersProduct } from '../services/Products';
import { SecondLoader } from '../common/Loader';
import '../css/style_products.css';
import '../css/product_list.css'

const ProductList = ({ products }) => {
  
  const { setProducts } = useProductContext();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // const { selectedProductId, setSelectedProductId, handleGoToDetails, handleAddToCart, isComplete, handleMoreProducts, loadingProducts } = ProductListTools();


  useEffect(() => {
    if(location.search){
      const params = new URLSearchParams(location.search);
      const paramsObject = Object.fromEntries(params.entries());
      filtersProduct(paramsObject).then(products => {
        setProducts(products)
    });
    }
  }, []);

  const orderBySettings = async (event) =>{
    setLoading(true)
    const filteredProducts = await filtersProduct({ orderBy: event.target.value });
    setProducts(filteredProducts);
    setLoading(false);
  }

  return (
   
    <div className={`pb-1 w-100 lg:4/6 xl:w-[80%] h-auto`}>
      <div className='py-1 w-100 d-flex justify-between px-2 border-b-1 shadow-md bg-gray-200'>
        <span className='py-1 px-1 text-sm'>Pagina 
          <span className='font-bold'>{" "} 1 {" "}</span>
           de {" "}
          <span className='font-bold'>{products.length}</span> 
          {" "} productos {" "}
          <span className='font-bold'>encontrados</span>
        </span>
        <select onChange={orderBySettings} className='w-full h-8 border rounded max-w-[170px] text-sm'>
          <option value="" className='text-black' hidden selected>Ordenar por</option>
          <option value="productPrice-DESC" className='text-black'>Precio: Mayor a menor</option>
          <option value="productPrice-ASC" className='text-black'>Precio: Menor a mayor</option>
          <option value="productName-ASC" className='text-black'>Nombre: A-Z</option>
          <option value="productName-DESC" className='text-black'>Nombre: Z-A</option>
          {/* <option value="productSold-DESC" className='text-black'>Mayores ventas</option>
          <option value="productRating-DESC" className='text-black'>Mayor valoración</option>
          <option value="productPopular-ASC" className='text-black'>Más populares</option> */}
        </select>
      </div>
      {!loading > 0 ? (
        <div className='xs:d-flex md:flex-column md:grid w-100 mb-3 pe-2 pt-2 gap-2'>
        {products.map((product, index) => {
          if(!location.pathname.includes(product.category.toLowerCase()) && !location.search && !location.pathname.includes('productos')) return;
          const randomStars = Math.floor(Math.random() * 5) + 1;
          return(
          <Link to={`/${product.category}/${product.id}`} key={index} className='px-1 min-h-3 bg-gray-50 w-100 flex gap-4 border rounded'>
            <div className='py-1 xs:w-40 lg:w-80 lg:h-60'>
              <img src={product.images[0].imageName} alt={product.name} className='w-full h-full border rounded object-cover'/>
            </div>
            <div className='d-flex flex-column ps-2 pb-3 pt-1 font-bold w-full '>
              <h1 className='w-100 xs:text-[12px] lg:text-lg font-light'>{product.name}</h1>
              <span className='font-light xs:text-[12px] lg:text-[16px] pt-1'>+{Math.floor(Math.random() * 5) + 1}00 ventas durante el mes </span>
              <div className="d-flex align-content-center">
                <div>
                <span className='font-light pe-1 xs:text-xs lg:text-sm'>({randomStars})</span>
                {[1, 2, 3, 4, 5].map(stars => (
                  <span
                    key={stars}
                    className={`star ${stars <= randomStars ? 'selected' : ''}`}
                  >
                    ★
                  </span>
                ))}
                </div>
              </div>
              <Currency amount={product.price} className={"xs:text-[14px] lg:text-[20px]"} currency={true}/>
              <p className='font-light xs:text-[12px] lg:text-[16px] pt-1'>Disponible con el <span className='font-bold'>{Math.floor(Math.random() * 99) + 1}%</span> de descuento</p>
            </div>
          </Link>
        )}
        )}
        </div>
      ):(
        <div className='relative w-100 h-screen'>
          <SecondLoader styles={"left-1/2 top-1/2"}/>
        </div>  
      )}
    </div>
  );
};

export default ProductList;
