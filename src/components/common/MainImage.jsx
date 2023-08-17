import React, { useState } from 'react';
import mainLenceria from "../../images/mainlenceria.jpg"

const ImageComponent = () => {

  const [fontFamily, setFontFamily] = useState('Dancing Script');

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
      }}
    >
      <img
        src={mainLenceria}
        alt="Imagen"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(30%)',
        }}
      />
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: fontFamily,
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      >
        Seasonal Seduction <h5>Unveiling the Hottest Lingerie Trends</h5>
        </h1>
    </div>
  );
};

export default ImageComponent;
