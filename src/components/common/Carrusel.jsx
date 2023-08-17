import React from 'react';
import { Carousel } from 'react-bootstrap';

const MyCarousel = () => {
  return (
    <div style={{backgroundColor: "#000"}}>
        <div className='mb-3 py-5'>
            <h2 className='text-center text-white'>Productos más vendidos</h2>
        </div>
        <Carousel style={{ width: '100%', backgroundColor: "#000"}}>
            <Carousel.Item>
                <div style={{ position: 'relative' }}>
                <img
                    src="https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600"
                    alt="Imagen con blur"
                    style={{ borderRadius: "5px", width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(4px)', height: "45em", opacity: '0.6' }}
                />
                <img
                    src="https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600"
                    alt="Imagen sin blur"
                    style={{ borderRadius: "5%", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '70%' }}
                />
                <Carousel.Caption>
                    <h3 >Producto 1</h3>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={{ position: 'relative' }}>
                <img
                    src="https://img.asmedia.epimg.net/resizer/EecVrnU1dnzXdzmcMkzHJCGBZUc=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/E3JN5PFPHJLFVI42AA33FQQJPU.jpg"
                    alt="Imagen con blur"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(4px)',  height: "45em", opacity: '0.6' }}
                />
                <img
                    src="https://img.asmedia.epimg.net/resizer/EecVrnU1dnzXdzmcMkzHJCGBZUc=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/E3JN5PFPHJLFVI42AA33FQQJPU.jpg"
                    alt="Imagen sin blur"
                    style={{ borderRadius: "5%", position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '70%' }}
                />
                 <Carousel.Caption>
                    <h3>Producto 2</h3>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default MyCarousel;
