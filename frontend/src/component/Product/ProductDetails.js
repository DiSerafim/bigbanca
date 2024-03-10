import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErros, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "crimson",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    const [quantity, setQuantity] = useState(1);
    
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty)
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty)
    }

    // Action - Adicionar items ao carrinho
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Adicionado ao carrinho de compras");
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product.name} - BancaDoVovô`} />
                    <div className="ProductDetails">
                        {/* Carrossel */}
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.length > 0 && product.images.map((item, i) => (
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
                        <div>
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
                                <span>{product.numOfReviews}</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`R$ ${product.price},00`}</h1>

                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button onClick={addToCartHandler}>Comprar</button>
                                </div>

                                {/* Estoque */}
                                <p>
                                    Estoque:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        <p>{product.Stock < 1 ? "Sem estoque": "Disponível"}</p>
                                    </b>
                                </p>
                            </div>

                            {/* Descrição */}
                            <div className="detailsBlock-4">
                                Descrição:<p>{product.description}</p>
                            </div>

                            {/* Avalização */}
                            <button className="submitReview">Avalie Este Produto</button>
                        </div>
                    </div>

                    {/* Avaliações */}
                    <h3 className="reviewsHeading">Avaliações</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && product.reviews.map(
                                (review) => <ReviewCard review={review} />
                            )}
                        </div>
                    ) : (
                        <p className="noReviews">Este produto ainda não recebeu avaliações.</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}

export default ProductDetails;