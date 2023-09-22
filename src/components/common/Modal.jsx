import React, {useEffect} from 'react';
import useProductContext from '../hooks/useProductContext';
import Auth from '../User/Login';
import Payform from './PayForm';
import '../css/modal.css';


const InfoModal = ({product, styles}) => {

  const {  
    setModalPayment,
    userLogged,
  } = useProductContext();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setModalPayment(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleCloseModal = () => {
    setModalPayment(false);
  }

  return (
    <div className='info-modal'>
        <div className='info-modal-close' onClick={handleCloseModal}>
          <span>X</span>
        </div>
        <div className='info-modal-form'>
          <div>
            {userLogged.length > 0 ? (
                <Payform product={product}/>
              ):(
               <Auth/>
            )}
          </div>
        </div>
    </div>
  );
};

export default InfoModal;
