import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Delete, StarHalf } from "@material-ui/icons";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { getAllReviews, deleteReviews, clearErros } from "../../actions/productAction";
import "./ProductReviews.css";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.review
      );
    
      const { error, reviews, loading } = useSelector(
        (state) => state.productReviews
      );
    
      const [productId, setProductId] = useState("");
    
      const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
      };
    
      const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
      };
    
      useEffect(() => {
        if (productId.length === 24) {
          dispatch(getAllReviews(productId));
        }
        if (error) {
          alert.error(error);
          dispatch(clearErros());
        }
    
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErros());
        }
    
        if (isDeleted) {
          alert.success("Review Deleted Successfully");
            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
          }
    }, [dispatch, alert, error, deleteError, isDeleted, navigate, productId]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            minWidth: 200,
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Usuário",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "comment",
            headerName: "Comentário",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Nota",
            type: "number",
            minWidth: 100,
            flex: 0.5,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                ? "greenColor"
                : "redColor";
            }
        },
        {
            field: "actions",
            flex: 0.6,
            headerName: "Apagar",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                  <Fragment>
                    <Button
                      onClick={() =>
                        deleteReviewHandler(params.getValue(params.id, "id"))
                      }
                    >
                      <Delete />
                    </Button>
                  </Fragment>
                );
              },
        },
    ];

    const rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            name: item.name,
        });
    });

    return (
        <Fragment>
            <MetaData title={`Todas Avaliações - Admin`} />

            <div className="dashboard">
                <Sidebar />
                
                <div className="productReviewsContainer">
                    <form
                        className="createReviewsForm"
                        encType="multipart/form-data"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">Lista de Avaliações</h1>
                        <div>
                            <StarHalf />
                            
                            <input
                                type="text"
                                placeholder="ID do produto"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Procurar
                        </Button>
                    </form>

                    {
                        reviews && reviews.length > 0
                        ? <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                        : <h1>Sem avaliações!</h1>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default ProductReviews;