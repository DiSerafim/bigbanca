import React from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../img/perfil.jpg";

const ReviewCard = ({ review }) => {
    const options = {
        size: "large",
        value: review.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return <div className="reviewCard">
        <img src={profilePng} alt="UserUsuário" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
    </div>;
};

export default ReviewCard;