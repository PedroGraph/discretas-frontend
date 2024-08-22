import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import share from '../../../image/share.svg'
import facebook from '../../../image/messenger.svg'
import whatsapp from '../../../image/whatsapp.svg'
import '../css/share_style.css';

const ShareButton = () => {
  const location = useLocation();
  const url = window.location.origin+location.pathname;
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
  const shareOnFacebook = () => {
    if (isMobile) {
        window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`, '_blank');
      } else {
        window.open(`https://www.messenger.com/share/?url=${encodeURIComponent(url)}`, '_blank');
      }
  };

  const shareOnWhatsApp = () => {
    if (isMobile) {
        window.open(`whatsapp://send?phone=573196584661&text=${encodeURIComponent(url)}`, '_blank');
      } else {
        window.open(`https://web.whatsapp.com/send?phone=573196584661&text=${encodeURIComponent(url)}`, '_blank');
      }
  };

  return (
    <div className="share-button-container">
      <button className="share-main-button" onClick={handleShareClick}>
        <img src={share} alt="" />
      </button>
      <div className={`share-options ${showShareOptions ? 'visible' : ''}`}>
        <button className="share-option-button" onClick={shareOnFacebook}>
            <img src={facebook} alt="" />
        </button>
        <button className="share-option-button" onClick={shareOnWhatsApp}>
            <img src={whatsapp} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
