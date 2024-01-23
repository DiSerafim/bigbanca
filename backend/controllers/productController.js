const Product = require("../models/productModel");

// Cria o Produto no DB
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = (rec, res) => {

    res.status(200).json({ message: "A rota está funcionando bem" })
};