import React from 'react';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useProductContext from '../hooks/useProductContext';
import Currency from '../common/CurrencyFormater';
import '../css/style_products.css';
import '../css/product_list.css'
import { ProductListTools } from '../hooks/ProductList/ProductList';

const ProductList = ({ products }) => {
  
  const { handleAddWishList, isAddedToWishList } = useProductContext();
  const { selectedProductId, setSelectedProductId, handleGoToDetails, handleAddToCart, isComplete, handleMoreProducts, loadingProducts } = ProductListTools();

  const handleAddProductToWishList = (product) =>{
    handleAddWishList(product)
  }

  return (
    <div className='product-list-box d-flex justify-content-between'>
      <div className='d-flex flex-wrap mb-5 '>
      {products.map((product, index) => (
        <div key={index} className='product-col'>
          <Card className="cards-list">
            <Link to={"/lubricantes/"+product._id} className='product-link' style={{textDecoration:"none", color: "black"}}>
              <Card.Img variant="top" src={product.image[0]} />
              <Card.Body>
                <Card.Title style={{fontWeight: "600", fontSize: "16px"}}>{product.name}</Card.Title>
                <Card.Text><Currency amount={product.price}/></Card.Text>
                </Card.Body>
                </Link>
                <div className={!isAddedToWishList(product._id) ? 'wishlist' : 'wishlist-activated'} onClick={(e) => {handleAddProductToWishList(product)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
                    </svg>
                  </div>
                  <div className='wishlist-notify'>
                    <span>{ 
                      !isAddedToWishList(product._id) ? 
                      'Añadir producto a la lista de deseos' :
                      'Eliminar producto de la lista de deseos'
                    }
                    </span>
                  </div>
                <div className="star-items d-flex px-2">
                  <div>
                  {[1, 2, 3, 4, 5].map(stars => (
                    <span
                      key={stars}
                      className={`star ${stars <= product.stars ? 'selected' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                  </div>
                 
                </div>
                <div className='p-1 look-product-button'>
                  <Button className='p-2' onClick={() => { handleGoToDetails(product); }}>Ver producto</Button>
                  {selectedProductId === product._id && isComplete ? (
                    <Button key={index} className='p-2 bg-success'>✅</Button>
                  ) : (
                    <Button
                      key={index}
                      className='p-2'
                      onClick={() => {
                        setSelectedProductId(product._id);
                        handleAddToCart(product);
                      }}
                    >
                      Añadir al 🛒
                    </Button>
                  )}
                </div>
            </Card>
          </div>
      ))}
      <div className='more-products w-100 d-flex justify-content-center mt-5'>
        {loadingProducts ? (
          <Spinner animation="border" size="sm" />
        ):(
          <button onClick={handleMoreProducts}>Cargar más productos</button>
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductList;
