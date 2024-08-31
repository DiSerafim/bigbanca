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
import { getAllOrders, clearErrors, deleteOrder } from "../../actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstants";

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            alert.success("Pedido deletado.");
            navigate("/admin/orders");
            dispatch({ type: DELETE_ORDERS_RESET });
        }
        
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Situação",
            minWidth: 150,
            flex: 1,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Entregue"
                ? "greenColor" : "redColor"
            },
        },
        {
            field: "itemsQty",
            headerName: "Quantidade",
            type: "number",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Preço",
            type: "number",
            minWidth: 100,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Ação",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    return (
        <Fragment>
            <MetaData title={`Todos Produtos - Admin`} />

            <div className="dashboard">
                <Sidebar />
                
                <div className="productListContainer">
                    <h1 id="productListHeading">Lista de Produtos</h1>

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

export default OrderList;