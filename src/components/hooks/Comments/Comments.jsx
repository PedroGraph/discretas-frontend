import React, {useState, useEffect} from "react";
import {ProductComments, SaveComment} from "../../services/Comments";

export const Comments = () => {

    const url = window.location.href;
    const pathSegments = url.split('/');
    const productID = pathSegments[4];

    const [uComments, setUComments] = useState([]);

    useEffect(() => {
      ProductComments(productID).then((comments) =>{
        setUComments(comments);
      });
    },[]);

    const handleSaveComment = (comment) => {
      SaveComment(comment).then(response =>{
        ProductComments(productID).then((comments) =>{
          setUComments(comments);
        });
      })
    }


    return {uComments, setUComments, handleSaveComment};

}