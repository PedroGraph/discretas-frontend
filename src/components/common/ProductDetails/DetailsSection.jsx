import React, {useState, useEffect} from "react";
import ProductDescription from "../ProductDescription";
import CommentSection from "../CommentsSection";
import {Comments} from "../../hooks/Comments/Comments";
import '../../css/product_details.css'

const Details = () =>{

    const [sectionSelected, setSectionSelected] = useState("0_pdt");
    const [usersComments, setUsersComments] = useState([]);
    const {uComments, setUComments, handleSaveComment} = Comments();
    
    useEffect(() =>{
      setUsersComments(uComments);
    },[uComments])

    const handleChange = (event) => {
        const {id} = event.target;
        setSectionSelected(id);
    }

    return(
        <>
        <div className="d-flex align-items-center flex-column">
            <div className='details-section-column '>
                <div className="col-md-6 text-center" >
                    <span id="0_pdt" onClick={(e)=>{handleChange(e)}} >Detalles del Produto</span>
                </div>
                <div className="col-md-6 text-center">
                    <span  id="1_pdt" onClick={(e)=>{handleChange(e)}}>Comentarios y Calificaciones</span>
                    <p>{usersComments ? usersComments.length : 0}</p>
                </div>
            </div>
        </div>
        <div className="p-1 pt-0">
        {
          sectionSelected === "0_pdt" && (
            <ProductDescription/>
          )
        }
        {
          sectionSelected === "1_pdt" && (
            <CommentSection comments={usersComments || []} saveComment={handleSaveComment}/>
          )
        }
        </div>
        </>
    )
}

export default Details;