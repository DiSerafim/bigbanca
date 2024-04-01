import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />
            <Typography>Seu pedido foi feito com sucesso</Typography>
            <Link to={"/order/me"}>Ver pedidos</Link>
        </div>
    );
}

export default OrderSuccess;