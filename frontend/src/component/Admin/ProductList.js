import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { clearErros, getAdminProduct, deleteProduct } from "../../actions/productAction";
import "./ProductList.css";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect (() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErros());
        }
        if (isDeleted) {
            alert.success("O Produto Foi Deletado.");
            navigate("/admin/dashboard");
            dispatch({ type: DELETE_PRODUCT_RESET });

        }
        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Nome",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Estoque",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Preço",
            type: "number",
            minWidth: 270,
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
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

export default ProductList;