import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import "./MyOrders.css";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { loading, error, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        {
            field: "id",
            headerName: "ID do Pedido",
            minWidth: 250,
            flex: 0.3
        }, {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Entregue" ? "greenColor" : "redColor";
            },
        }, {
            field: "itemsQty",
            headerName: "Quantidade",
            type: "number",
            minWidth: 150,
            flex: 0.3
        }, {
            field: "amount",
            headerName: "Montante",
            type: "number",
            minWidth: 150,
            flex: 0.3
        }, {
            field: "actions",
            headerName: "Visualizar",
            minWidth: 150,
            type: "number",
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                const handleRedirect = () => {
                    navigate(`/order/${params.getValue(params.id, "id")}`)
                }
                return (
                    <LaunchIcon className="clickable-icon" onClick={handleRedirect} />
                );
            },
        },


    ];
    const rows = [];

    orders &&
    orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });
    

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, alert, error]);

    return <Fragment>
        <MetaData title={`user.name - Pedidos`} />
        {loading ? (
            <Loader />
        ) : (
            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />
                <Typography id="myOrdersHeading">{user.name} Pedidos</Typography>
            </div>
        )}
    </Fragment>;
}

export default MyOrders;