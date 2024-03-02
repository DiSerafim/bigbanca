require('dotenv').config()
const express = require ("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Importa as rotas
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

// API
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware para tratar erros de conexão Http
app.use(errorMiddleware);

module.exports = app
