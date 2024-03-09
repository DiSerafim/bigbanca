import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, resetPassword } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Cria uma nova senha (reset)
const ResetPassword = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { token } = useParams();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Sua senha foi alterada");
            navigate("/login");
        }
    }, [alert, dispatch, error, navigate, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Atualizar Senha" />

                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading">Nova Senha</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                                >
                                <div className={`loginPassword ${password.length >= 8 ? 'valid' : 'invalid'}`}>
                                    <LockOpenIcon />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nova Senha"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                    </span>
                                </div>
                                <div className={`loginPassword ${confirmPassword.length >= 8 ? 'valid' : 'invalid'}`}>
                                    <LockIcon />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirme a Senha"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                    </span>
                                </div>
                                <input
                                    type="submit"
                                    value="Atualizar"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ResetPassword;