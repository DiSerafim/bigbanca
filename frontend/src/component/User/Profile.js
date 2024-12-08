import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "./Profile.css"

const Profile = () => {
    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                    <Fragment>
                        <MetaData title={`${user.name} Perfil`} />
            
                        <div className="profileContainer">
                            <div>
                                <h1>{`${user.name} Perfil`}</h1>
                                <img src={user.avatar.url} alt={user.name} />
                                <Link to="/me/update">Editar Perfil</Link>
                            </div>
                            <div>
                                <div>
                                    <h4>Nome:</h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4>Email:</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4>Entrou em:</h4>
                                    <p>{String(user.createdAt).substr(0, 10)}</p>
                                </div>
                                <div>
                                    <Link to="/orders">Meus Pedidos</Link>
                                    <Link to="/password/update">Alterar Senha</Link>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    );
}

export default Profile;
