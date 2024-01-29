const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, digite o seu nome"],
        maxLength: [30, "O nome não pode exceder 30 caracteres"],
        minLength: [4, "O nome deve ter mais de 4 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor, digite o seu e-mail"],
        unique: true,
        validate: [validator.isEmail, "Por favor, digite um e-mail válido"]
    },
    password: {
        type: String,
        required: [true, "Por favor, digite sua senha"],
        minLength: [8, "A senha deve ter mais de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);