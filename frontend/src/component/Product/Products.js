import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const [currentPage, setCurrentPage] = useState(1);

    const { products, loading, productsCount, resultPerPage } = useSelector(
        (state) => state.products
    );

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);
    
    return <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
                <h2 className="productsHeading">Produtos</h2>

                <div className="products">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>

                {/* Paginação */}
                {resultPerPage < productsCount && (
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
}

export default Products;