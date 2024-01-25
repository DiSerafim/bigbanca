const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler")

// Cria um produto
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// Mostra todos os produtos
exports.getAllProducts = async (rec, res) => {
    const products = await Product.find();
    res.status(200).json({
        message: "A rota está funcionando bem",
        success: true,
        products
    })
};

// Mostra detalhes do produto
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Produto não encontrado", 404));
    }
    res.status(200).json({
        success: true,
        product
    })
}

// Atualiza um produto pelo seu id
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Produto não encontrado", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Deleta um produto pelo seu id
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler("Produto não encontrado", 404));
    }
    
    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Produto excluído com sucesso!"
    })
}