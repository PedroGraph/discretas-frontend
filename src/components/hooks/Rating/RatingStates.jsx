import React, {useState, useEffect} from "react";
import useProductContext from "../useProductContext";
import { RatingInfo, ProductRating } from "../../services/Rating";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export const RatingStates = ({productID}) => {

    const [totalRating, setTotalRating] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [userStars, setUserStars] = useState(0);
    const [loginModal, setLoginModal] = useState(false);
    const [hasHalfStar, setHasHalfStar] = useState(0 - Math.floor(0) >= 0.25);
    const { userLogged } = useProductContext();


    useEffect(() => {

        RatingInfo({
        productID: productID,
        userID: userLogged
        })
        .then((response) => {
            // console.log(response)
            setTotalRating(response?.productTotalRating);
            setTotalStars(response.averageRating);
            if(userLogged.length !== 0) setUserStars(response.productUserRating);
    
        })
        .catch(error => {
            console.error(error);
        })
        
        
    }, [productID, userStars]); 

    const handleCloseLoginModal = () => {
        setLoginModal(false);
    }
    

    const handleStarClick = (selectedRating) => {
        if(userLogged.length > 0) {
            setUserStars(selectedRating);
            setHasHalfStar(selectedRating - Math.floor(selectedRating) >= 0.25);
        }else{
            setLoginModal(true);
        }
        
    };
    
    const generateRatingStars = (stars) => {
    
        const data = {
            productID: productID,
            stars: stars,
            uid: userLogged
        }
    
        if(stars > 0 && userLogged.length != 0) ProductRating(data);
    
        const rating = [];
    
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                rating.push( <FaStar key={i} onClick={() => handleStarClick(i + 1)} style={{ cursor: 'pointer' }} /> );
            } else if (i === Math.floor(rating) && hasHalfStar) {
                rating.push( <FaStarHalfAlt key={i} onClick={() => handleStarClick(i + 0.5)} style={{ cursor: 'pointer' }}/>);
            } else {
                rating.push( <FaRegStar key={i} onClick={() => handleStarClick(i + 1)} style={{ cursor: 'pointer' }} />);
            }
        }
    
        return rating;
    };
    
    const setRatingStars = (stars) => {
        const setRating = [];
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                setRating.push( <FaStar key={i+10} disabled="disabled"/> );
            } else if (i === Math.floor(totalRating) && hasHalfStar) {  
                setRating.push( <FaStarHalfAlt key={i+10} disabled="disabled" /> );
            } else {
                setRating.push( <FaRegStar key={i+10} disabled="disabled" /> );
            }
        }
        return setRating;
    };
    
    
    return {userStars, totalRating, totalStars, setRatingStars, generateRatingStars, loginModal, setLoginModal, handleCloseLoginModal}
}