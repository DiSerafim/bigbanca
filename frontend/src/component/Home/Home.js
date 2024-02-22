import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import "./Home.css";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="BancaDoVovô - Início" />

                    <div className="banner">
                        <p>Bem-vindo a BANCA ON-LINE.</p>
                        <h1>ENCONTRE PRODUTOS INCRÍVEIS</h1>

                        <a href="#container">
                            <button>
                            Ver <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Produtos em Destaque</h2>

                    <div className="container" id="container">
                        {products && products.map((product) => <Product product={product} />)}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;