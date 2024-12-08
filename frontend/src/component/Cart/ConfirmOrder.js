import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    );

    const shippingCharges = subtotal > 100 ? 10 : 20;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment');
    }

    return (
        <Fragment>
            <MetaData title="Rastreamento do Pedido" />

            <CheckoutSteps activeStep={1} />

            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Informações para Envio</Typography>

                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Nome:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Telefone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Endereço:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="confirmCartItems">
                        <Typography>Itens do seu carrinho:</Typography>

                        <div className="confirmCartItemsContainer">
                            {cartItems && 
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}{" "}
                                        </Link>
                                        <span>
                                            {item.quantity} X R$ {item.price} = {" "}
                                            <b>R$ {item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/* */}
                <div>
                    <div className="orderSummary">
                        <Typography>Resumo do Pedido</Typography>

                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>R$ {subtotal}</span>
                            </div>
                            <div>
                                <p>Frete:</p>
                                <span>R$ {shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>R$ {shippingCharges}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>R$ {totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Pagar</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ConfirmOrder;