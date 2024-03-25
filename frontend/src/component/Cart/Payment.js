import React, { Fragment, useRef } from "react";
// import { useDispatch } from "react-redux";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    // useStripe,
    // useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../layout/MetaData";
import "./Payment.css";
import { Typography } from "@material-ui/core";

const Payment = () => {
    // const dispatch = useDispatch();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);

    const submitHandler = {};

    return (
        <Fragment>
            <MetaData title="Pagamento" />
            <CheckoutSteps activeStep={2} />
            
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Pagamento no Cartão</Typography>

                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pagamento - ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
            <EventIcon />
            <VpnKeyIcon />
        </Fragment>
    );
};

export default Payment;