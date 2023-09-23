import React, {useState} from "react";
import ProductDescription from "../ProductDescription";
import CommentSection from "../CommentsSection";
import '../../css/product_details.css'

const Details = () =>{
    const [sectionSelected, setSectionSelected] = useState("0_pdt");

    const handleChange = (event) => {
        const {id} = event.target;
        console.log(event.target)
        setSectionSelected(id);
    }

    const comments = [
        {
          "name": "Shakirinha",
          "email": "Shakirita@gmail.com",
          "photourl": "https://www.prensalibre.com/wp-content/uploads/2023/09/shakira-2.jpg?quality=52&w=760&h=430&crop=1",
          "comment": "Great product, highly recommended! It is a perfect lubricant for nights of passion with the person you love the most. Unfortunately Piqué was not that person, in Colombia we call those people 'Picha Muerta'.",
          "stars": 5
        },
        {
          "name": "Karol Yi",
          "email": "kaolyi@gmail.com",
          "photourl": "https://laopinion.com/wp-content/uploads/sites/3/2023/06/Karol-G-2-e1687486612929.jpeg?quality=80&strip=all&w=960",
          "comment": "Disis ameising. I lie, Not as good as I expected, but still decent.",
          "stars": 3
        },
        {
          "name": "Bebesita Ua ",
          "email": "anueluabebesita@gmail.com",
          "photourl": "https://elcomercio.pe/resizer/_0HHDv-iETT-pWlMKLLRKEDagdI=/580x330/smart/filters:format(jpeg):quality(90)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/JYNDHPFUXFFYHPCHFBDHJJ5NTQ.jpg",
          "comment": "Amazing quality, exceeded my expectations.",
          "stars": 5
        },
        {
          "name": "Le Piqué El Anuel",
          "email": "paquetiko@gmail.com",
          "photourl": "https://cdn-3.expansion.mx/dims4/default/ec40611/2147483647/strip/true/crop/1200x800+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F15%2Fb8%2F7a2355ff4d8abb212b6dfe57de7f%2Fgerard-pique-1.jpg",
          "comment": "Average product, nothing special.",
          "stars": 2
        }
      ]

    return(
        <>
        <div className="d-flex align-items-center flex-column">
            <div className='details-section-column '>
                <div className="col-md-6 text-center" >
                    <span id="0_pdt" onClick={(e)=>{handleChange(e)}} >Detalles del Produto</span>
                </div>
                <div className="col-md-6 text-center">
                    <span  id="1_pdt" onClick={(e)=>{handleChange(e)}}>Comentarios y Calificaciones</span>
                    <p>{comments.length}</p>
                </div>
            </div>
        </div>
        <div className="p-5 pt-0">
        {
          sectionSelected === "0_pdt" && (
            <ProductDescription/>
          )
        }
          
        {
          sectionSelected === "1_pdt" && (
            <CommentSection comments={comments}/>
          )
        }
        </div>
        </>
    )
}

export default Details;