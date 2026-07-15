const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");

const {
    initializePayment,
    verifyPayment
} = require("../controllers/payment.controller");

/**
 * Initialize Paystack payment
 */
router.post(
    "/payment/initialize",
    verifyToken,
    initializePayment
);

/**
 * Verify Paystack payment
 */
router.post(
    "/payment/verify",
    verifyToken,
    verifyPayment
);

module.exports = router;