const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
        validate: [validator.isEmail, "Por favor, digite um e-mail válido"],
        index: true
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

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compara senha de usuárioGerando Token de Redefinição de Senha
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Gera Token para Redefinição de Senha de usuário
userSchema.methods.getResetPasswordToken = function () {
    // Gera o token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Criptografa e adiciona o token de redefinição de senha ao esquema do usuário
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;    
}

module.exports = mongoose.model("User", userSchema);