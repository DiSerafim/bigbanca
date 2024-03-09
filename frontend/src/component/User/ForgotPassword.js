import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from '@mui/icons-material/Mail';
import "./ForgotPassword.css";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [alert, error, dispatch, message]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Senha Esquecida" />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordUpBox">
                            <h2 className="forgotPasswordHeading">Esqueceu sua senha</h2>
                            {/* Formulário de Cadastro */}
                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <input type="submit" value="Enviar" className="forgotPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ForgotPassword;