import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../img/perfil.jpg";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "crimson",
        size: window.innerWidth < 600 ? 20 : 25,
        value: 1,
        isHalf: true,
    };

    return <div className="reviewCard">
        <img src={profilePng} alt="UserUsuário" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>;
};

export default ReviewCard;