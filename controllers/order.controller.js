const Order = require("../models/order.model");

/**
 * Get all orders for the logged in user
 */
const getOrders = async (req, res) => {
    try {

        const userId = req.user.id;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalOrders: orders.length,
            orders
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


/**
 * Get a single order
 */
const getOrder = async (req, res) => {

    try {

        const userId = req.user.id;
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/**
 * Cancel an order
 */
const cancelOrder = async (req, res) => {

    try {

        const userId = req.user.id;
        const { orderId } = req.params;

        const order = await Order.findOne({
            _id: orderId,
            userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Delivered orders cannot be cancelled."
            });
        }

        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order has already been cancelled."
            });
        }

        order.orderStatus = "Cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            order
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    getOrders,
    getOrder,
    cancelOrder
};