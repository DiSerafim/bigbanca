import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "crimson",
    size: window.innerWidth < 600 ? 10 : 15,
    value: 1.5,
    isHalf: true,
};

const Product = ({ product }) => {
    return(
        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <span>{`R$${product.price}`}</span>
            <div>
                <ReactStars {...options} className="react-stars" />
                <span>256</span>
            </div>
        </Link>


    );
}

export default Product;