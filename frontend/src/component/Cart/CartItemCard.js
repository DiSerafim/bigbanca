import React, { Fragment } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
    return (
        <Fragment>
            <div className="CartItemCard">
                <img src={item.image} alt="ssa" />

                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`R$${item.price}`}</span>
                    <p>Excluir</p>
                </div>
            </div>
        </Fragment>
    );
};

export default CartItemCard;