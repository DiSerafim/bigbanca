import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"
import "./Search.css";

const Search = ({ history }) => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Pesquisar ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Pesquisar" />
            </form>
        </Fragment>
    );
}

export default Search;