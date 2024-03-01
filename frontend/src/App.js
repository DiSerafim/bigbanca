import React from "react"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";

function App() {
    React.useEffect(() => {
        webFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Montserrat"]
            },
        });
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route exact path="/search" element={<Search />} />

                <Route exact path="/login" element={<LoginSignUp />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
