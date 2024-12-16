import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);
    const {
        error: deleteError,
        isDeleted,
        message,
      } = useSelector((state) => state.profile);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect (() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Um usuário foi Deletado.");
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });

        }
        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

    const columns = [
        {
            field: "id",
            headerName: "Usuário ID",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Nome",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "role",
            headerName: "Função",
            minWidth: 100,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === "admin" ? "greenColor" : "redColor";
            },
        },
        {
            field: "actions",
            flex: 0.2,
            headerName: "Editar",
            minWidth: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                    </Fragment>
                );
            },
        },
        {
            field: "action",
            flex: 0.3,
            headerName: "Apagar",
            minWidth: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = users?.map((item) => ({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
    })) || [];

    return (
        <Fragment>
            <MetaData title={`Todos Usuários - Admin`} />

            <div className="dashboard">
                <Sidebar />
                
                <div className="productListContainer">
                    <h1 id="productListHeading">Usuários Registrados</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default UsersList;