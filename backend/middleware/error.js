const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno do servidor.";

    // Erro de ID incorreto do MongoDB
    if (err.name === "CastError") {
        const message = `Erro de ID incorreto ou Inválido: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}