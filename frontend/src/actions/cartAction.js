import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPIN_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Action - Adicionar Items ao Carrinho
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action - Remove Items do Carrinho
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Action - Salva Informações de Envio
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPIN_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
};
