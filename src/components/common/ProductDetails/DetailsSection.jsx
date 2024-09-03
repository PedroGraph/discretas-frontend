import React, {useState, useEffect} from "react";
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
        <div className="flex justify-center w-full xs:flex-col lg:flex-row">
        </div>
        </>
    )
}

export default Details;