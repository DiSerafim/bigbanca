const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// https://console.cloudinary.com/pm/c-b85b67ec125dec9f0b72c20be0e323/media-explorer/avatars
const cloudinary = require("cloudinary");

// Cadastro de Usuário
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 250,
        crop: "scale",
    });
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    // JWT token
    sendToken(user, 201, res);
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
    // JWT token
    sendToken(user, 200, res);
});

// Desconecta usuário
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Você foi desconectado",
    });
});

// Pedido para atualizar senha perdida do usuário
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("Usuário não existe", 404));
    }

    // Obtém o Token de Redefinição de Senha
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    console.log(resetToken);
    console.log(resetPasswordUrl);
    const message = `Clique no link para alterar sua senha :- \n\n ${resetPasswordUrl} \n\nSe você não pediu para atualizar sua senha, desconsidere esta mensagem.`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Recuperação de Senha do E-commerce`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Um e-mail para atualização de senha foi enviado para ${user.email}`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Recuperação de senha perdida
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Gera um código hash para um token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Redefinição de token inválida ou hash expirou", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Senha não coincide", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
})

//  Detalhes do usuário
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Atualiza senha através do seu perfil
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Esta não é sua senha atual", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Senhas não correspondem", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Atualiza perfil
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 250,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Mostra todos usuários (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Mostra usuário por ID (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuário não existe Id ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Atualiza função de Usuário comum ou Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserRole = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    await User.findByIdAndUpdate(req.params.id, newUserRole, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    });
});

// Deleta usuário (Admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuário não encontrado com ID: ${req.params.id}`, 400))
    }

    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuário excluído!",
    });
});