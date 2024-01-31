const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Cria um novo usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "Isto é uma amostra id",
            url: "profilepicUrl",
        },
    });

    // JWT token
    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });
});

// Login de usuário
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // Verifica se o usuário forneceu senha e e-mail
    if (!email || !password) {
        return next(new ErrorHandler("Por favor, digite Email & Senha", 400));
    }
    
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Email ou senha Inválido", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Email ou senha Inválido", 401));
    }

    const token = await user.getJWTToken();
    res.status(200).json({
        success: true,
        token,
    });
});