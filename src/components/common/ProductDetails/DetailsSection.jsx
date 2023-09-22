import React from "react";
import '../../css/product_details.css'

const Details = () =>{
    return(
        <div className="d-flex justify-content-center">
            <div className='details-section-column'>
                <div className="col-md-6 text-center">
                    <span>Detalles del Produto</span>
                </div>
                <div className="col-md-6 text-center">
                    <span>Comentarios y Calificaciones</span>
                    <p>1</p>
                </div>
            </div>
        </div>
    )
}

export default Details;