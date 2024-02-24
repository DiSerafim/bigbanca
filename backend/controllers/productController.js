const Product = require("../models/productModel");
const errorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Cria um produto
exports.createProduct = catchAsyncErrors(
    async (req, res, next) => {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    }
);

// Exibe todos os produtos
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
        const products = await apiFeature.query;
        res.status(200).json({
            success: true,
            products,
            productCount,
        });
    });

// Exibe detalhes do produto
exports.getProductDetails = catchAsyncErrors(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new errorHandler("Produto não encontrado", 404));
        }
        res.status(200).json({
            success: true,
            product,
        })
    }
);

// Atualiza um produto pelo seu id
exports.updateProduct = catchAsyncErrors(
    async (req, res, next) => {
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
);

// Deleta um produto pelo seu id
exports.deleteProduct = catchAsyncErrors(
    async (req, res, next) => {
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
);

// Cria nova Avaliação ou Atualiza Avaliação
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.use._id.toString());

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === rev.user._id.toString()) {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true,
    });
});

// Exibe todas as avaliações de um produto
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new errorHandler("Produto não encontrado", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Excluir avaliação
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new errorHandler("Produto não encontrado", 404));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
