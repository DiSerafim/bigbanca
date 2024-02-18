const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Cria novo Pedido
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});

// Exibe um pedido por Id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new ErrorHandler("Pedido não encontrado com este Id", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Exibe pedidos de usuários logados
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Exibe todos pedidos - Admin
exports.getAllOrders = catchAsyncErrors(async (rec, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Atualiza Status do pedido - Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Pedido não encontrado, não existe.", 404));
      }

    if (order.orderStatus === "Entregue") {
        return next(new ErrorHandler("Produto já foi entregue", 400));
    }

    if (req.body.status === "Enviado para entrega") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Entregue") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Entrega confirmada."
    });
});

// Atualiza estoque
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// Deleta pedido - Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next (new ErrorHandler("Pedido não encontrado com este Id", 404));
    }

    res.status(200).json({
        success: true,
        message: "Pedido Excluído",
    });
});
