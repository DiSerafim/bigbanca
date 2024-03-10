import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    // adiciona +1
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    // remove 1
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    return (
        <Fragment>
            {/* Descrição */}
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Produto</p>
                    <p>Quantidade</p>
                    <p>Subtotal</p>
                </div>
            </div>

            {/* Item no Carrinho */}
            {cartItems && cartItems.map((item) => (
                <div className="cartContainer">
                    <CartItemCard item={item} />

                    <div className="cartInput">
                        <button onClick={() =>
                            decreaseQuantity(item.product, item.quantity)
                        }>-</button>

                        <input type="number" value={item.quantity} readOnly />

                        <button onClick={() => 
                            increaseQuantity(item.product, item.quantity, item.stock)
                        }>+</button>
                    </div>

                    <p className="cartSubtotal">{`R$${item.price * item.quantity}`}</p>
                </div>
            ))}

            {/* Valor Total */}
            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Valor Total</p>
                    <p>{`R$6000`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button>Confirmar</button>
                </div>
            </div>
        </Fragment>
    );
};

export default Cart;