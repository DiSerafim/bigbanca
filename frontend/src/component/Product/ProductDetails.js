import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErros, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const { product = {}, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError } = useSelector((state) => state.newReview);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    
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

    // Adicionar items ao carrinho
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Adicionado ao carrinho de compras");
    };

    // Abre a janela para avaliar produto
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    // Envia Uma Nova Avaliação
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));
        setOpen(false);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErros());
        }
        if (success) {
            alert.success("Agradecemos sua avaliação, Obrigado.");
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert, reviewError, success]);

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
                                <p>{product.category}</p>{" "}
                                <p>{/*{product.ratings}*/}</p>
                                <p>{/* {product.reviews} */}</p>
                                <p>{/*product.createdAt*/}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">{" "}{product.numOfReviews}</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`R$ ${product.price},00`}</h1>

                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled ={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >Comprar</button>
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
                            <button onClick={submitReviewToggle} className="submitReview">Avalie Este Produto</button>
                        </div>
                    </div>

                    {/* Avaliações */}
                    <h3 className="reviewsHeading">Avaliações</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Avaliar Este Produto</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows= "5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">Cancelar</Button>
                            <Button onClick={reviewSubmitHandler} color="primary">Enviar</Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                            ))}
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