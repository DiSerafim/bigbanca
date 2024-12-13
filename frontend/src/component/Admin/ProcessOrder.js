import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AccountTree } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";
import "./ProcessOrder.css";

const ProcessOrder = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order); 

    const [status, setStatus] = useState("");
    
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("status", status);
        dispatch(updateOrder(params.id, myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Pedido Atualizado!");
            dispatch({ type: UPDATE_ORDERS_RESET });
        }
        dispatch(getOrderDetails(params.id));
    }, [alert, dispatch, error, isUpdated, params.id, updateError]);

    return (
        <Fragment>
            <MetaData title={"Processar pedido"} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader/>
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{ display: order.orderStatus === "Entregue" ? "block" : "grid" }}
                        >
                            <div>
                                <div className="confirmShippingArea">
                                    <Typography>Informações Para envio</Typography>

                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Nome:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Telefone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Endereço:</p>
                                            <span>
                                                {order.shippingInfo && 
                                                    `${order.shippingInfo.address},
                                                    ${order.shippingInfo.city},
                                                    ${order.shippingInfo.state},
                                                    ${order.shippingInfo.pinCode},
                                                    ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Informações de Pagamento</Typography>

                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                                }
                                            >
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "Pago"
                                                    : "Aguardando pagamento"
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p>Preço:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Status de entrega</Typography>

                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus &&
                                                    order.orderStatus === "Entregue"
                                                    ? "greenColor"
                                                    : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="confirmCartItems">
                                    <Typography>Items no carrinho:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X{ } R${item.price} ={" "}
                                                <b>R$ {item.price * item.quantity}</b>
                                            </span>
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                                {/*  */}
                                <div
                                    style={{
                                    display: order.orderStatus === "Entregue" ? "none" : "block",
                                    }}
                                >
                                    <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                    >
                                    <h1>Processar pedido</h1>

                                    <div>
                                        <AccountTree />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Escolha a situação</option>
                                        {order.orderStatus === "Preparando" && (
                                            <option value="Enviado">Enviado</option>
                                        )}

                                        {order.orderStatus === "Enviado" && (
                                            <option value="Entregue">Entregue</option>
                                        )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                        loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Atualizar
                                    </Button>
                                    </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ProcessOrder;