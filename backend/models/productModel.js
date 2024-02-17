const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    // Sub-esquema para informações de Produto
    name: {
        type: String,
        required: [true, "Por favor, digite o nome do produto"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Por favor, digite a descrição do produto"]
    },
    price: {
        type: Number,
        required: [true, "Por favor, digite o valor do produto"],
        max: [88888888, "O preço não pode exceder 8 caracteres"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Por favor, digite a categoria do produto"]
    },
    Stock: {
        type: Number,
        required: [true, "Por favor, digite o estoque do produto"],
        max: [9999, "O estoque não pode exceder 4 caracteres"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);