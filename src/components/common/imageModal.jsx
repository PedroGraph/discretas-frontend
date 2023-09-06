import React from "react";
import useProductContext from "../hooks/useProductContext";
import { Modal } from "react-bootstrap";
import '../css/imageModal.css'
const imageModalZoom = () =>{

    const { closeImageModal, imageModal} = useProductContext()

    return(
        <Modal show={imageModal} className='image-modal'>
            <Modal.Body>
                <div className="d-flex justify-content-end" style={{cursor: "pointer"}} onClick={closeImageModal}><span style={{fontSize: "20px"}}>x</span></div>
                <img src={imageModal} alt="" style={{width: "100%", height: "70%"}}/>
            </Modal.Body>
        </Modal>
    )
    
}

export default imageModalZoom;