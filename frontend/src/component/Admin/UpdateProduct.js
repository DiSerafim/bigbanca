import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErros, getProductDetails, updateProduct } from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const UpdateProduct = () =>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();

    const { product, error } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.updateProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Notebooks",
        "Calçados",
        "Calças",
        "Camisas",
        "Vestuário",
        "Câmeras",
        "Celulares"
    ];

    const productId = params.id;
    
    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        };
        if (error) {
            alert.error(updateError);
            dispatch(clearErros());
        };
        if (updateError) {
            alert.error(error);
            dispatch(clearErros());
        };
        if (isUpdated) {
            alert.success("Esse produto foi atualizado.");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        };
    }, [alert, dispatch, error, isUpdated, navigate, product, productId, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                };
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title={"AtualizarProduto"} />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Atualizar produto {product.name}</h1>
                        
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder={product.name}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder={product.price}
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <Description />
                            <textarea
                                placeholder={product.name}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        
                        <div>
                            <AccountTree />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Escolha a Categoria</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder={product.name}
                                required
                                value={name}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                placeholder={product.name}
                                onChange={updateProductImagesChange}
                            />
                        </div>
                        
                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Avatar" />
                            ))}
                        </div>
                        
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Avatar" />
                            ))}
                        </div>
                        
                        <div>
                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={loading ? true : false}
                            >Atualizar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateProduct;