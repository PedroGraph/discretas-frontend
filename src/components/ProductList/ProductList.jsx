import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Currency from '../common/CurrencyFormater';
// import { ProductListTools } from '../hooks/ProductList/ProductList';
import { filtersProduct } from '../services/Products';
import '../css/style_products.css';
import '../css/product_list.css'
import { SecondLoader } from '../common/Loader';

const ProductList = ({ products }) => {
  
  const { setProducts } = useProductContext();
  const [loading, setLoading] = useState(false);
  // const { selectedProductId, setSelectedProductId, handleGoToDetails, handleAddToCart, isComplete, handleMoreProducts, loadingProducts } = ProductListTools();

  const orderBySettings = async (event) =>{
    setLoading(true)
    const filteredProducts = await filtersProduct({ orderBy: event.target.value });
    console.log(filteredProducts)
    setProducts(filteredProducts);
    setLoading(false);
  }

  return (
   
    <div className='pb-1 w-100 lg:4/6 xl:w-[80%] h-screen'>
      <div className='py-1 w-100 d-flex justify-between px-2 border-b-1 shadow-md'>
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
        <div className='xs:d-flex md:flex-column md:grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6 w-100 mb-3 px-2 pt-2 gap-1'>
        {products.map((product, index) => {
          const randomStars = Math.floor(Math.random() * 5) + 1;
          return(
          <Link to={`/${product.category}/${product.id}`} key={index} className='px-1 min-h-3 bg-white w-100 d-flex border rounded'>
            <div className='py-1 w-40'>
              <img src={product.images[0].imageName} alt={product.name} className='w-full h-full border rounded object-cover'/>
            </div>
            <div className='d-flex flex-column ps-2 pb-3 pt-1 font-bold w-60 '>
              <span className='w-100 text-[12px]'>{product.name}</span>
              <span className='font-light text-[12px] pt-1'>+{Math.floor(Math.random() * 5) + 1}00 ventas durante el mes </span>
              <div className="d-flex align-content-center">
                <div>
                <span className='font-light pe-1 text-xs '>({randomStars})</span>
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
              <Currency amount={product.price} className={"text-[14px]"} currency={true}/>
              <p className='font-light text-[12px] pt-1'>Disponible con el <span className='font-bold'>{Math.floor(Math.random() * 99) + 1}%</span> de descuento</p>
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
