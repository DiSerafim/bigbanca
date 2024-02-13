const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno do servidor.";

    // Erro de ID incorreto do MongoDB
    if (err.name === "CastError") {
        const message = `Erro de ID incorreto ou Inválido: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //  Erro de chave duplicada do Mongoose
    if (err.code === 11000) {
        const message = `Desculpe, este ${Object.keys(err.keyValue)} já está em uso.`;
        err = new ErrorHandler(message, 400);
    }

    // Erro de JWT errado
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token é inválido, Tente novamente`;
        err = new ErrorHandler(message, 400);
    }

    // Erro de JWT expirado
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token expirou, Tente novamente`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}