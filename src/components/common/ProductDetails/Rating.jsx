import React, {useState} from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../../css/style_products.css'


const Rating = ({stars}) =>{

    const [currentRating, setCurrentRating] = useState(Math.floor(1));
    const [hasHalfStar, setHasHalfStar] = useState(stars - Math.floor(0) >= 0.25);

    const handleStarClick = (selectedRating) => {
        setCurrentRating(Math.floor(selectedRating));
        setHasHalfStar(selectedRating - Math.floor(selectedRating) >= 0.25);
    };


    const generateRatingStars = (stars) => {
        const rating = [];
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
            rating.push(
                <FaStar
                key={i}
                onClick={() => handleStarClick(i + 1)}
                style={{ cursor: 'pointer' }}
                />
            );
            } else if (i === Math.floor(rating) && hasHalfStar) {
            rating.push(
                <FaStarHalfAlt
                key={i}
                onClick={() => handleStarClick(i + 0.5)}
                style={{ cursor: 'pointer' }}
                />
            );
            } else {
            rating.push(
                <FaRegStar
                key={i}
                onClick={() => handleStarClick(i + 1)}
                style={{ cursor: 'pointer' }}
                />
            );
            }
        }

        return rating;
    };

    return(
        <>
            <div className="rating">{generateRatingStars(currentRating)}</div>
            <div style={{marginLeft: "5px"}} className='mb-3'>Calificaciones ({stars})</div>
        </>
    )
    

}

export default Rating;