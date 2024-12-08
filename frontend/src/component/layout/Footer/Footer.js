import React from "react";
import playstore from "../../../img/playstore.png";
import applestore from "../../../img/applestore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>BAIXE NOSSO APP</h4>
                <p>Baixe o aplicativo para celular Android e IOS</p>
                <img src={playstore} alt="app playstore" />
                <img src={applestore} alt="app aplestore" />
            </div>

            <div className="midFooter">
                <h1>BANCA ONLINE.</h1>
                <p>Alta qualidade é nossa primeira prioridade</p>
                <p>Direitos autorais 2024 &copy; DiSerafim</p>
            </div>

            <div className="rightFooter">
                <h4>Siga-nos</h4>
                <a href="https://facebook.com">Facebook</a>
                <a href="https://instagram.com">Instagram</a>
                <a href="https://whatsapp.com">Whatsapp</a>
            </div>
        </footer>
    );
};

export default Footer;