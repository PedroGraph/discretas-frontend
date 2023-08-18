import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Col } from 'react-bootstrap';
import { Slider } from './Recomendations';

const showComments = async (universityId) => {
    return await axios.post(`https://discretas-backend.onrender.com/json-com/comentarios`,{
          universityId: universityId
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
    });
};

async function updatedLike(comentarioId, info, action) {
  await axios.post(`https://discretas-backend.onrender.com/json-com/comentarios/updatelikes`,{
        comentarioId: comentarioId,
        info: info,
        action: action
      })
      .then((response) => {
        console.log("Updated", response.data)
      })
      .catch((error) => {
        console.log(error);
  });
};

async function deleteComment(comentarioId) {
  await axios.post(`https://discretas-backend.onrender.com/json-com/comentarios/deletecomment`,{
    commentId: comentarioId,
      })
      .then((response) => {
        console.log("Deleted", response.data)
      })
      .catch((error) => {
        console.log(error);
  });
};

export const CommentComponent = () => {

    const [like, setLike] = useState([]);
    const [dislike, setDislike] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const { uid } = useParams();
    const [name, setName] = useState('');

    const [show, setShow] = useState(false);
    const [deletecomentario, setDeletecomentario] = useState('');

    const handleClose = () => setShow(false);

    const infolike = [];
    const infodislike = [];
    
    useEffect(() => {

      //OBTIENE TODOS LOS COMENTARIOS RELACIONADOS A LA UNIVERSIDAD
      const fetchComments = () => {
        showComments(uid).then((comments) => {
          setComentarios(comments);
          comments.map((comment) => {
            infolike[comment._id] = comment.likes;
            infodislike[comment._id] = comment.dislikes;
            setLike(infolike)
            setDislike(infodislike)
          });
        });
      };

      //OBTIENE EL NOMBRE DEL USUARIO QUE INICIÓ SESIÓN
      if(localStorage.getItem('user')){
        setName(localStorage.getItem('user'));
      }
      
      fetchComments();
      setInterval(fetchComments,1000);
      
    }, [uid]);


    //PERMITE QUE EL USUARIO PUEDA HACER DISLIKE Y QUITAR EL DISLIKE 
    const handleDislike = (id, usuario) => {
      const dislikeArray = dislike[id];

      if (!dislike[id].hasOwnProperty(usuario)) {

        const addInfo = { ...dislikeArray, [usuario]: "true" }; ///PARA AÑADIR DISLIKE
        setDislike(prevArray => ({
          ...prevArray,
          [id]: addInfo
        }));

        if(like[id][usuario]){

          const likeArray = like[id];
          const { [usuario]: valorEliminado, ...nuevoObjeto } = likeArray; 
          setLike(prevArrayObjetos => ({
            ...prevArrayObjetos,
            [id]: nuevoObjeto
          }));

          if (!likeArray.hasOwnProperty(usuario)) {
            likeArray[usuario] = "true";
          }else{
            delete likeArray[usuario];
          }
          updatedLike(id, likeArray, "like")
        }

      }else{
        const { [usuario]: valorEliminado, ...nuevoObjeto } = dislikeArray; ///PARA AÑADIR DISLIKE
        setDislike(prevArrayObjetos => ({
          ...prevArrayObjetos,
          [id]: nuevoObjeto
        }));
      }

  
      let update = dislike[id];
      if (!update.hasOwnProperty(usuario)) {
           update[usuario] = "true";
      }else{
        delete update[usuario];
      }

      updatedLike(id, update, "dislike")
    };


    //PERMITE QUE EL USUARIO PUEDA HACER LIKE Y QUITAR EL LIKE 
    const handleLike = (id, usuario) => {
      const likeArray = like[id];
      if (!like[id].hasOwnProperty(usuario)) {
        const addInfo = { ...likeArray, [usuario]: "true" }; ///PARA AÑADIR DISLIKE
        setLike(prevArray => ({
          ...prevArray,
          [id]: addInfo
        }));

        if(dislike[id][usuario]){

          const dislikeArray = dislike[id];
          const { [usuario]: valorEliminado, ...nuevoObjeto } = dislikeArray; ///PARA AÑADIR DISLIKE
          setDislike(prevArrayObjetos => ({
            ...prevArrayObjetos,
            [id]: nuevoObjeto
          }));

          if (!dislikeArray.hasOwnProperty(usuario)) {
            dislikeArray[usuario] = "true";
          }else{
            delete dislikeArray[usuario];
          }

          updatedLike(id, dislikeArray, "dislike")
        }
        
      }else{
        const { [usuario]: valorEliminado, ...nuevoObjeto } = likeArray; ///PARA AÑADIR DISLIKE
        setLike(prevArrayObjetos => ({
          ...prevArrayObjetos,
          [id]: nuevoObjeto
        }));
      }

      let update = like[id];
      if (!update.hasOwnProperty(usuario)) {
           update[usuario] = "true";
      }else{
        delete update[usuario];
      }

      updatedLike(id, update, "like")
    };

    const handleDeleteComment = () =>{
      if(deletecomentario !== ''){
        deleteComment(deletecomentario);
        setDeletecomentario('');
        setShow(false)
      }else{
        setShow(false);
      }
    }

    const handleModal = (id) =>{
      setShow(true);
      setDeletecomentario(id);
    }
    
    const renderComments = () => {
      return(
        comentarios.map((comments, index) => (
          <div key={index}>
            <Col className="section-comment">
              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <span style={name === comments.usuario ? { fontWeight: 'bold', color: "#AC32DA" } : {fontWeight: 'bold'}}>{comments.usuario}</span> 
                </div>
                <div style={{ marginBottom: '10px' }}>{comments.comentario}</div>
              </div>
            </Col>
            <div style={{display:"flex"}}>
              <div style={{  justifyContent: 'flex-end', marginTop: '0.2em', marginBottom: "2em" }} >
                <button id={index} className="likebutton" style={like[comments._id]?.[name] ? {backgroundColor: "#67917a"} : {}}  onClick={() => handleLike(comments._id, name)}> 👍 {like[comments._id] ? Object.values(like[comments._id]).length : "no sirve"} </button>
                <button id={index} className="likebutton" style={dislike[comments._id]?.[name]  ? {backgroundColor: "#f04842"} : {}}  onClick={() => handleDislike(comments._id,  name)}> 👎 {dislike[comments._id] ? Object.values(dislike[comments._id]).length : "no sirve"} </button>
              </div>
              <div style={{marginTop: "0.3em", position: "absolute", right: "8.5%"}}>
                {name === comments.usuario ? <button id={index} className="likebutton" style={{border: "none", backgroundColor: "red"}} onClick={() => handleModal(comments._id)}> 🗑️ </button> : ""}
              </div>
            </div>
          </div>
        ))
      );
    };
    
    return (
      <>
      <Slider></Slider>
        <div style={{ backgroundColor: "#136991", paddingTop: "3rem"}}>
          <h4 style={{textAlign: "center"}}>{comentarios.length > 0 ? "Comentarios más recientes" : "No hay comentarios"}</h4>
          {renderComments()}
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <p>¿Quieres eliminar el comentario?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleDeleteComment}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};
  

