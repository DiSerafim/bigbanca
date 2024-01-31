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