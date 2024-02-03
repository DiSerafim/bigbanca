require('dotenv').config()
const express = require ("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

// Importa as rotas
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

// API
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware para tratar erros de conexão Http
app.use(errorMiddleware);

module.exports = app
