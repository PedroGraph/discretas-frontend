import React, {useState, useEffect} from "react";
import { Row, Col, Carousel, Card } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
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
    
        const scaleRatio = 1.8; 
    
        const translateX = offsetX * (scaleRatio - 1);
        const translateY = offsetY * (scaleRatio - 1);
    
        setZoomStyle({
          transform: `scale(${scaleRatio}) translate(${-translateX}px, ${-translateY}px)`,
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
        <div className='col'>
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
          
        </div>
        <div md={6} 
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
    </>
    )

}

export default ProductImage;