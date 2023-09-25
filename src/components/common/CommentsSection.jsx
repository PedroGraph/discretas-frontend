import React from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../css/comments.css';
const CommentSection = ({comments, saveComment, userInfo}) => {

    const handleStars = (stars) => {
        const rating = [];
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                rating.push( <FaStar key={i+10} disabled="disabled"/> );
            } else {
                rating.push( <FaRegStar key={i+10} disabled="disabled" /> );
            }
        }
        return rating;
    }

    const ratingPercentage = (stars) => {
        let coincidences = 0;
        comments.map((comment) => {
            if(parseInt(comment.stars) === stars) coincidences++
        })
        const percentage = (coincidences / comments.length) * 100;
        return (<span>{percentage.toFixed(1)}%</span>)
    }

    const handleAddComments = (e) => {
        e.preventDefault();

        const name = e.target[0].value;
        const email = e.target[1].value;
        const comment = e.target[2].value;
        const userComment = {
            productID: comments[0].productID,
            name: name,
            email: email,
            photourl: "https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1",
            comment: comment,
            stars: 3,
        }
        saveComment(userComment);
    }

    return (
    <div className="d-flex">
        <div className="p-5 pt-0 col-md-7">
          <div className="px-5">
            {
              comments.map((comment, index) => (
                <div key={index} className="comment-section">
                 <div className="col-mb-3">
                    <img src={comment.photourl} alt="" />
                    <span>{comment.name}</span>
                    <div className="d-flex pt-5">
                        {handleStars(comment.stars)}
                    </div>
                 </div>
                 <div className="col-mb-9">
                    <p>{comment.comment}</p>
                    <div className="d-flex comments-likes">
                        <div className="mx-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-up-filled" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M13 3a3 3 0 0 1 2.995 2.824l.005 .176v4h2a3 3 0 0 1 2.98 2.65l.015 .174l.005 .176l-.02 .196l-1.006 5.032c-.381 1.626 -1.502 2.796 -2.81 2.78l-.164 -.008h-8a1 1 0 0 1 -.993 -.883l-.007 -.117l.001 -9.536a1 1 0 0 1 .5 -.865a2.998 2.998 0 0 0 1.492 -2.397l.007 -.202v-1a3 3 0 0 1 3 -3z" strokeWidth={0} fill="rgb(74, 128, 230)"></path>
                            <path d="M5 10a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-7a2 2 0 0 1 1.85 -1.995l.15 -.005h1z" strokeWidth={0} fill="rgb(74, 128, 230)"></path>
                        </svg>
                        </div>
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-thumb-down-filled" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z" strokeWidth={0} fill="rgb(252, 73, 73)"></path>
                            <path d="M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z" strokeWidth={0} fill="rgb(252, 73, 73)"></path>
                        </svg>
                        </div>
                    </div>
                 </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="p-5 pt-0 col-md-5">
          <div className="px-5">
            <h3>Opiniones de los clientes</h3>
            <div>
                <span>Calificación total: {comments.length}</span>
            </div>
            <div className="mt-3">
                <div className="d-flex clients-rating">
                    {handleStars(5)} {ratingPercentage(5)}
                </div>
                <div className="d-flex clients-rating">
                    {handleStars(4)} {ratingPercentage(4)}
                </div>
                <div className="d-flex clients-rating">
                    {handleStars(3)} {ratingPercentage(3)}
                </div>
                <div className="d-flex clients-rating">
                    {handleStars(2)} {ratingPercentage(2)}
                </div>
                <div className="d-flex clients-rating">
                    {handleStars(1)} {ratingPercentage(1)}
                </div>
            </div>
            <div>
                <form onSubmit={(e) => {handleAddComments(e)}}>
                <span className="mx-3">*Tu correo no se mostrará en las sección de comentarios*</span>
                <div className="d-flex mt-3 px-3">
                    <input type="text" name="name" id="" placeholder="Nombre"/>
                    <input type="text" name="email" id="" placeholder="Correo electrónico"/>
                </div>
                <div className="px-3 mt-3 ">
                    <textarea name="" id="" className="w-100 h-50" placeholder="¿Qué opinas del producto?"></textarea>
                </div>
                <div className="px-3 d-flex justify-content-end">
                    <button className="bg-black">Enviar Comentario</button>
                </div>
                </form>
            </div>
          </div>
        </div>
    </div>
    )
}

export default CommentSection