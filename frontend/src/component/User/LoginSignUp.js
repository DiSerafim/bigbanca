import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import "./LoginSignUp.css";

const LoginSignUp = () => {
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = () => {
        console.log("Formulário Enviado")
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_sign_toogle">
                            <p onClick={(e) => switchTabs(e, "login")}>Entrar</p>
                            <p onClick={(e) => switchTabs(e, "register")}>Criar Conta</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>

                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot">Esqueci minha senha..</Link>
                        <input type="submit" value="Entrar" className="loginBtn" />
                    </form>
                </div>
            </div>
            Olá mundo!
            Deus seja louvado!
        </Fragment>
    );
};

export default LoginSignUp;
