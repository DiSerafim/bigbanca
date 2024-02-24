import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";


const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "crimson",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    return (
        <Fragment>
            <div className="ProductDetails">
                {/* Carrossel */}
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                        ))}
                    </Carousel>
                </div>
                {/* Descrição */}
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Item # {product._id}</p>
                    <p>{product.category}</p>
                    <p>{product.ratings}</p>
                    <p>{/* {product.reviews} */}</p>
                    <p>{product.createdAt}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>Avaliação {product.numOfReviews}</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`R$ ${product.price},00`}</h1>

                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button>-</button>
                            <input value="1" />
                            <button>+</button>
                        </div>{" "}
                    </div>
                    <button>Comprar</button>
                </div>

                {/* Estoque */}
                <p>
                    Estoque: {" "}
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        <p>{product.Stock < 1 ? "Sem estoque": "Disponível"}</p>
                    </b>
                </p>

                {/* Descrição */}
                <div className="detailsBlock-4">
                    <span>{product.description}</span>
                </div>

                {/* Avalização */}
                <button className="submitReview">Avalie Este Produto</button>
            </div>
        </Fragment>
    );
}

export default ProductDetails;