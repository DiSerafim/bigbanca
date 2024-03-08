import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Sua senha foi atualizada");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [alert, dispatch, error, isUpdated, navigate]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Atualizar Senha" />

                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading">Atualizar Senha</h2>
                            <form
                                className="updatePasswordForm"
                                encType="multipart/form-data"
                                onSubmit={updatePasswordSubmit}
                                >
                                <div className={`loginPassword ${oldPassword.length >= 8 ? 'valid' : 'invalid'}`}>
                                    <VpnKeyIcon />
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        placeholder="Senha Antiga"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowOldPassword(!showOldPassword)}>
                                        {showOldPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                                    </span>
                                </div>
                                <div className={`loginPassword ${newPassword.length >= 8 ? 'valid' : 'invalid'}`}>
                                    <LockOpenIcon />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Nova Senha"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <span onClick={() => setShowNewPassword(!showNewPassword)}>
                                        {showNewPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
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
                                    className="updatePasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdatePassword;