import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/common/ProductDetail';
import Details from '../../components/common/ProductDetails/DetailsSection';
import useProductContext from '../../components/hooks/useProductContext';
import RelatedProduct from '../../components/common/RelatedProducts';
import './FailPageEarly.css'

const Producto = () => {
  const { products } = useProductContext();
  const { productId } = useParams();
  const product = products.find(product => product['_id'] === productId);

  const comments = [
    {
      "name": "Shakirinha",
      "photourl": "https://www.prensalibre.com/wp-content/uploads/2023/09/shakira-2.jpg?quality=52&w=760&h=430&crop=1",
      "price": 500439
    },
    {
      "name": "Karol Yi",
      "photourl": "https://laopinion.com/wp-content/uploads/sites/3/2023/06/Karol-G-2-e1687486612929.jpeg?quality=80&strip=all&w=960",
      "price": 312342
    },
    {
      "name": "Bebesita Ua ",
      "photourl": "https://elcomercio.pe/resizer/_0HHDv-iETT-pWlMKLLRKEDagdI=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/JYNDHPFUXFFYHPCHFBDHJJ5NTQ.jpg",
      "price": 543432
    },
    {
      "name": "Le Piqué El Anuel",
      "photourl": "https://cdn-3.expansion.mx/dims4/default/ec40611/2147483647/strip/true/crop/1200x800+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F15%2Fb8%2F7a2355ff4d8abb212b6dfe57de7f%2Fgerard-pique-1.jpg",
      "price": 223123
    }
  ]


  return (
    <div className='container-detail'>
      <div className='first-section'>
        <ProductDetail/>
      </div>
      <div className='second-section'>
        <Details/>
      </div>
      <div>
        <RelatedProduct products={comments}/>
      </div>
    </div>
  );
};

export default Producto;
