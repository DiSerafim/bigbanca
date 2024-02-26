import React, { Fragment, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./Products.css";

const Products = () => {
    const dispatch = useDispatch();

    const { products, loading, error, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

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
            </Fragment>
        )}
    </Fragment>
}

export default Products;