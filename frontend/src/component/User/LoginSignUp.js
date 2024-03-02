import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
// https://mui.com/material-ui/material-icons/
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import "./LoginSignUp.css";

const LoginSignUp = () => {
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/frontend/src/img/profile.png");

    const { name, email, password } = user;

    const loginSubmit = () => {
        console.log("Login Formulário Enviado");
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        console.log("Registro Formulário Enviado");
    }

    const registerDataChange = (e) => {
        // e.preventDefault();
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

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

                    {/* Formulário de Login */}
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

                    {/* Formulário de Cadastro */}
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Nome"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpName">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Senha"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Criar Conta" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default LoginSignUp;
