import React, {useState, useEffect} from "react";
import { Row, Col, Carousel, Card } from 'react-bootstrap';
import '../../css/style_products.css'

const ProductImage = ({image}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomStyle, setZoomStyle] = useState({
        transform: 'scale(1) translate(0, 0)',
    });


    useEffect(()=>{
        setSelectedImage(image[0]);
    },[])
    
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleMouseMove = (e) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
      
        const scaleRatio = 2.1;
      
        // Calcular el factor de escala máximo permitido para evitar salir del div
        const maxScaleX = container.clientWidth / (container.clientWidth * scaleRatio);
        const maxScaleY = container.clientHeight / (container.clientHeight * scaleRatio);
      
        // Asegurarse de que no se exceda el factor de escala máximo permitido
        const actualScaleX = Math.max(scaleRatio, maxScaleX);
        const actualScaleY = Math.max(scaleRatio, maxScaleY);
      
        // Calcular la traslación en función del factor de escala actual
        const translateX = offsetX * (actualScaleX - 1);
        const translateY = offsetY * (actualScaleY - 1);
      
        setZoomStyle({
          transform: `scale(${actualScaleX}, ${actualScaleY}) translate(${-translateX}px, ${-translateY}px)`,
        });
      };
      

    const handleMouseLeave = () => {
        setZoomStyle({
            transform: 'scale(1) translate(0, 0)',
            maxWidth: "600px"
        });
    };

    const isMobile = window.innerWidth <= 400;
 
    return(
    <>
        <div className='col-md-7 d-flex mt-5'>
            {!isMobile ? (
                <div className='image-selected-section'>
                {image.map((images, index) => (
                    <Row
                    key={index}
                    className={selectedImage === images ? 'm-1 image-bordered image-section' : 'm-1 image-section'}
                    onClick={() => handleImageClick(images)}
                    style={{minWidth: "80px"}}
                    >
                    <img src={images} alt={`Image ${index}`} style={{minWidth: "80px"}}/>
                    </Row>
                ))}
                </div>
                ):(
                <Carousel className='image-selected-section'>
                {image.map((images, index) => (
                    <Carousel.Item key={index}>
                    <Row onClick={() => handleImageClick(images)}>
                        <Col key={index} sm={3}>
                        <Card className='text-center'>
                            <Card.Img variant="top" src={images} />
                        </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
                ))}
                </Carousel>
                )
            }
            <div  
                className="image-container col"
                onMouseMove={!isMobile ? handleMouseMove : ''}
                onMouseLeave={handleMouseLeave}
                >
                    {selectedImage && (
                    <div className="selected-image">
                        <img src={selectedImage}
                        className="zoom-image"
                        style={zoomStyle} />
                    </div>
                    )}
            </div>
        </div>
        
    </>
    )

}

export default ProductImage;