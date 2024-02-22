import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import "./Home.css";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRW1-Fu4baINkJ6XPPCD2okRQmI0313bGJGE0WNYvqzDecWwdyJJ_s8qtPDFyCNnlbTd6JBJYcn0-wZ4lOWuygSrdwLEnvuAeshmZUOcpng5aLHKqy1TLGlkyEXvG7SqT3mAGKpi4M&usqp=CAc" }],
    price: "R$ 3.000,00",
    _id: "Diego",
}

const Home = () => {
    const dispatch = useDispatch();

    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <Fragment>
            {loading ? ("Abrindo...") : (
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
                        <Product product={product} />
                        
                        {products && products.map((product) => <Product product={product} />)}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;