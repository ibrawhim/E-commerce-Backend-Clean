const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");

const {
    getOrders,
    getOrder,
    cancelOrder
} = require("../controllers/order.controller");

/**
 * Get all orders
 */
router.get(
    "/orders",
    verifyToken,
    getOrders
);

/**
 * Get one order
 */
router.get(
    "/orders/:orderId",
    verifyToken,
    getOrder
);

/**
 * Cancel an order
 */
router.patch(
    "/orders/:orderId/cancel",
    verifyToken,
    cancelOrder
);

module.exports = router;