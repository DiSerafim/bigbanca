require('dotenv').config()
const express = require ("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// Importa as rotas
const product = require("./routes/productRoute");

// API
app.use("/api/v1", product);

// Middleware para tratar erros de conexão Http
app.use(errorMiddleware);

module.exports = app
