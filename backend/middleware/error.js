const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, res, req, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Erro interno do servidor.";

    res.status(err.statusCode).json({
        success: false,
        error: err,
    })
}