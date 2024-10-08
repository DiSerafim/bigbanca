import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErros, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
    "Notebooks",
    "Calçados",
    "Calças",
    "Camisas",
    "Vestuário",
    "Câmeras",
    "Celulares"
];

const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const {
        products,
        loading,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        error,
    } = useSelector((state) => state.products);
    const keyword = params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

    return (<Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <MetaData title={`Produtos - BancaDoVovô`} />
                <h2 className="productsHeading">Produtos</h2>

                <div className="products">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>

                {/* Filtra Produtos */}
                <div className="filterBox">
                    {/* Filtra preço */}
                    <Typography>Preço</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />

                    {/* Filtra categoria */}
                    <Typography>Categoria</Typography>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => setCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    {/* Filtra avaliação */}
                    <fieldset>
                        <Typography component="legend">Avaliação</Typography>
                        <Slider
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating);
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                    </fieldset>
                </div>

                {/* Paginação */}
                {resultPerPage < count && (
                    <div className="paginationBox">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText="Próxima"
                            prevPageText="Anterior"
                            firstPageText="Início"
                            lastPageText="Fim"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>
                )}
            </Fragment>
        )}
    </Fragment>
    );
}

export default Products;