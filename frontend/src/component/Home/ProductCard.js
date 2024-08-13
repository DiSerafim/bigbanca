import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        isHalf: true,
    };

    return(
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <span>{`R$${product.price}`}</span>
            <div>
                <Rating {...options} />
                <span className="productCardSpan">{product.numOfReviews}</span>
            </div>
        </Link>
    );
}

export default ProductCard;