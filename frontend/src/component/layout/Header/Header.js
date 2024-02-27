import React from "react";
// Menu - npmjs.com/package/overlay-navbar
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../img/logo-banca-do-vovo.png";
import "./Header.css";

const options = {
    burgerColor: "#000",
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    logoHoverSize: "10px",
    logoHoverColor: "crimson",
    navColor1: "white",
    navColor2: "#245",
    link1Text: "Home",
    link2Text: "Produtos",
    link3Text: "Contato",
    link4Text: "Sobre mim",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "White",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "crimson",
    link1Margin: "1vmax",
    profileIconColor: "rgba(35, 35, 35, 0.8)",
    searchIconColor: "rgba(35, 35, 35, 0.8)",
    cartIconColor: "rgba(35, 35, 35, 0.8)",
    IconColor: "white",
    profileColor: "white",
    profileIconColorHover: "crimson",
    searchIconColorHover: "crimson",
    cartIconColorHover: "crimson",
    cartIconMargin: "1vmax",
    profileIcon:true,
    ProfileIconElement: "MdAccountCircle", 
    searchIcon:true,
    SearchIconElement:"MdSearch",
    cartIcon:true,
    CartIconElement:"MdAddShoppingCart",
}

const Header = () => {
    return <ReactNavbar {...options} />;
}

export default Header;
