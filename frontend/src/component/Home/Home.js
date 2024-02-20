import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Bem-vindo a BANCA ON-LINE.</p>
                <h1>ENCONTRE PRODUTOS INCRÍVEIS</h1>

                <a href="#container">
                    <button>
                    Rolagem <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Produtos em Destaque</h2>
        </Fragment>
    );
};

export default Home;