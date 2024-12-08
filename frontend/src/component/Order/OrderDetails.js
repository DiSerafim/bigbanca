import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (id) {
            dispatch(getOrderDetails(id));
        }
    }, [dispatch, alert, error, id]);

    return <Fragment>
        {loading ? <Loader /> : <Fragment>
            <MetaData title="Detalhes do Pedido" />
            <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                    <Typography component="h1">Pedido #{order && order._id}</Typography>

                    <Typography>Informações Para Envio:</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p>Nome:</p>
                            <span>{order.user && order.user.name}</span>
                        </div>
                        <div>
                            <p>Endereço:</p>
                            <span>
                                {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.city}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.phoneNo}`}
                            </span>
                        </div>
                    </div>

                    <Typography>Pagamento:</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.paymentInfo &&
                                    order.paymentInfo.status === "Succeeded" 
                                        ? "greenColor"
                                        : "redColor"
                                }
                            >
                                {order.paymentInfo && order.paymentInfo.status === "Succeeded"
                                    ? "Pago"
                                    : "Aguardando Pagamento"
                                }
                            </p>
                        </div>
                        <div>
                            <p>Total:</p>
                            <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                    </div>

                    <Typography>Status do Pedido:</Typography>
                    <div className="orderDetailsContainerBox">
                        <div>
                            <p
                                className={
                                    order.orderStatus && order.orderStatus === "Entregue"
                                        ? "greenColor"
                                        : "redColor"
                                }
                            >
                                {order.orderStatus && order.orderStatus}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="orderDetailsCartItems">
                    <Typography>Itens Pedidos:</Typography>
                    <div className="orderDetailsCartItemsContainer">
                        {order.orderItems &&
                            order.orderItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
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
        </Fragment>}
    </Fragment>
        
};

export default OrderDetails;