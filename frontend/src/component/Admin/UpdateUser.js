import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { AccountCircle, Repeat, ContactMail} from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import "./NewProduct.css";
import { clearErrors, getUserDetails, updateUser } from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const {
        loading: updateLoading,
        error: updateError,
        isUpdated, } = useSelector((state) => state.profile);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const userId = params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setEmail(user.email);
            setName(user.name);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Atualizado dados do usuário");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, updateError, navigate, isUpdated, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <Fragment>
            <MetaData title="Adicionar Produto" />

            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader/>
                    : <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateUserSubmitHandler}
                >
                    <h1>Atualizar dados do usuário</h1>
                    <div>
                        <AccountCircle />
                        <input
                            type="text"
                            placeholder="Nome do usuário"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <ContactMail />
                        <input
                            type="email"
                            placeholder="Email do usuário"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <Repeat />
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Escolha uma função</option>
                            <option value="user">Usuário</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={updateLoading ? true : false || role === "" ? true : false}
                    >
                        Atualizar
                    </Button>
                </form> }
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateUser;