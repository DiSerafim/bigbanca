import React, { Fragment } from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <Fragment>
            <div className="CartItemCard">
                <img src={item.image} alt="ssa" />

                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`R$${item.price}`}</span>
                    <p onClick={() => deleteCartItems(item.product)}>Remover</p>
                </div>
            </div>
        </Fragment>
    );
};

export default CartItemCard;