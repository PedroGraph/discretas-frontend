import React from "react";
import { Modal } from 'react-bootstrap';
import { RatingStates } from "../../hooks/Rating/RatingStates";
import Auth from "../../User/Auth";
import '../../css/style_products.css'
import '../../css/rating.css'


const Rating = ({product}) =>{

    const {
        userStars, 
        totalRating, 
        setRatingStars,  
        loginModal, 
        handleCloseLoginModal
    } = RatingStates({productID:product});

    return(
        <>
            <div className="d-flex align-items-center">
                <div className='mb-3 pt-1 me-3'>Calificaciones ({totalRating || 0})</div>
                <div className="rating me-3" style={{marginTop: '-1rem'}}>
                    {setRatingStars()}
                </div> <div className="">
                    <span style={{fontSize: "12px", marginTop: '-0.3rem'}}>
                        {userStars > 0 ? '✅ Has calificado este producto' : ''}
                    </span>
                </div>
            </div>
            {
                 <Modal show={loginModal} onHide={handleCloseLoginModal} centered animation={true} className="users-modal">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body> 
                        <div className="d-flex justify-content-center">
                            <Auth form={true}/>
                        </div>
                    </Modal.Body>
                 </Modal>
            }
            
        </>
    )
    

}

export default Rating;