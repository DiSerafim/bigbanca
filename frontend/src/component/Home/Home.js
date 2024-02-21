import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";

const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRW1-Fu4baINkJ6XPPCD2okRQmI0313bGJGE0WNYvqzDecWwdyJJ_s8qtPDFyCNnlbTd6JBJYcn0-wZ4lOWuygSrdwLEnvuAeshmZUOcpng5aLHKqy1TLGlkyEXvG7SqT3mAGKpi4M&usqp=CAc" }],
    price: "R$ 3.000,00",
    _id: "diego",
}

const Home = () => {
    return (
        <Fragment>
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    );
};

export default Home;