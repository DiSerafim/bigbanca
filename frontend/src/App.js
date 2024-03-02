import React, { useState } from "react"
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
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/UserOptions";
import { useSelector } from "react-redux";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    React.useEffect(() => {
        webFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Montserrat"]
            },
        });
        store.dispatch(loadUser());
    }, []);

    return (
        <Router>
            <Header />

            {isAuthenticated && <UserOptions user={user} />}
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
