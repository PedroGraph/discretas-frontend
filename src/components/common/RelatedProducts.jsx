import React from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';
import { BsArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import '../css/style_products.css'

const relatedProducts = () => {

    const cardData = [
        {
          title: 'Card 1',
          text: 'This is the content of card 1.',
          imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
          title: 'Card 2',
          text: 'This is the content of card 2.',
          imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
        {
            title: 'Card 3',
            text: 'This is the content of card 1.',
            imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
        title: 'Card 4',
        text: 'This is the content of card 2.',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
        {
            title: 'Card 5',
            text: 'This is the content of card 1.',
            imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
        title: 'Card 6',
        text: 'This is the content of card 2.',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
        {
            title: 'Card 7',
            text: 'This is the content of card 1.',
            imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
        title: 'Card 8',
        text: 'This is the content of card 2.',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
        {
            title: 'Card 9',
            text: 'This is the content of card 1.',
            imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
        title: 'Card 11',
        text: 'This is the content of card 2.',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
        {
            title: 'Card 12',
            text: 'This is the content of card 1.',
            imageSrc: 'https://cdn.shopify.com/s/files/1/0690/5662/6962/products/193620-1600-auto.webp?v=1677561869&width=600',
        },
        {
        title: 'Card 13',
        text: 'This is the content of card 2.',
        imageSrc: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/373/669/products/26ba47b56d6071509a7fa778b6aa4c082fa2493133afc1099aa7457578bbfcbd1-3db44a82b6eaa9ffd816498778275835-1024-1024.webp',
        },
      ];

  
    const groupedCards = [];
    
    for (let i = 0; i < cardData.length; i += 4) {
        groupedCards.push(cardData.slice(i, i + 4));
    }

    const isMobile = window.innerWidth <= 400;
  
  return (
    <div className='d-grid justify-content-center'>
    <div className='text-center mt-5 mobile-carousel 2'><h3>Productos Relacionados</h3></div>
    {!isMobile ? (
      <Carousel className='m-5'  prevIcon={<BsArrowLeftCircleFill />} 
      nextIcon={<BsFillArrowRightCircleFill />} 
      >
      {groupedCards.map((group, groupIndex) => (
        <Carousel.Item key={groupIndex}>
          <Row>
            {group.map((card, cardIndex) => (
              <Col key={cardIndex} sm={3}>
                <Card className='text-center'>
                  <Card.Img variant="top" src={card.imageSrc} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                      {card.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
    ):(
      <Carousel className='m-5' >
        {cardData.map((card, cardIndex) => (
          <Carousel.Item key={cardIndex}>
          <Col key={cardIndex} sm={3}>
            <Card className='text-center'>
              <Card.Img variant="top" src={card.imageSrc} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>
                  {card.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          </Carousel.Item>
        ))}
    </Carousel>
    )}
    </div>
  );
};

export default relatedProducts;
