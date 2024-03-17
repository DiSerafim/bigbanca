import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { Link } from "react-router-dom";

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
    };

    // remove da lista de compras
    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>
                        Opa, parece que seu carrinho está vazio!
                    </Typography>
                    <Typography>
                        Que tal dar uma olhada nas nossas ofertas incríveis?
                    </Typography>
                    <Link to="/products">Ver produtos..</Link>
                </div>
            ) : <Fragment>
                    {/* Carrinho de Compras */}
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Produto</p>
                            <p>Quantidade</p>
                            <p>Subtotal</p>
                        </div>
                    </div>

                    {/* Item no Carrinho */}
                    {cartItems && cartItems.map((item) => (
                        <div className="cartContainer" key={item.product}>
                            <CartItemCard item={item} deleteCartItems={deleteCartItems} />

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
                            <p>{`R$ ${cartItems.reduce(
                                (acc, item) => acc + item.quantity * item.price, 0
                            )}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button>Confirmar</button>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

export default Cart;