const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Address = require("../models/address.model");

/**
 * Initialize Paystack Payment
 */
const initializePayment = async (req, res) => {
    try {

        const userId = req.user.id;
        const email = req.user.email;

        // Find user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty."
            });
        }

        // Calculate totals
        const totalItems = cart.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const totalPrice = cart.cartItems.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        // Generate transaction reference
        const reference = `ENAIJA-${userId}-${uuidv4()}`;

        // Initialize payment
        const response = await axios.post(
            "https://api.paystack.co/transaction/initialize",
            {
                email,
                amount: Math.round(totalPrice * 100),
                reference,
                callback_url: "https://enaijaacommerce.onrender.com/payment/success"
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Payment initialized successfully.",
            authorization_url: response.data.data.authorization_url,
            access_code: response.data.data.access_code,
            reference,
            totalItems,
            totalPrice
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.response?.data?.message || err.message
        });

    }
};

/**
 * Verify Paystack Payment
 */
const verifyPayment = async (req, res) => {
    try {

        const userId = req.user.id;

        const { reference } = req.body;

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: "Payment reference is required."
            });
        }

        // Get user's saved address
        const address = await Address.findOne({ userId });

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Please save your delivery address before completing payment."
            });
        }

        // Verify transaction with Paystack
        const verify = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );

        const payment = verify.data.data;

        if (payment.status !== "success") {
            return res.status(400).json({
                success: false,
                message: "Payment was not successful."
            });
        }

        // Get user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty."
            });
        }

        // Calculate totals
        const totalItems = cart.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const totalPrice = cart.cartItems.reduce(
            (sum, item) => sum + (item.price * item.quantity),
            0
        );

        // Verify amount
        if (payment.amount !== Math.round(totalPrice * 100)) {
            return res.status(400).json({
                success: false,
                message: "Payment amount does not match the cart total."
            });
        }

        // Prevent duplicate orders
        const existingOrder = await Order.findOne({
            paymentReference: payment.reference
        });

        if (existingOrder) {
            return res.status(409).json({
                success: false,
                message: "This payment has already been used to create an order."
            });
        }

        // Create order
        const order = new Order({
            userId,
            orderItems: cart.cartItems,
            totalItems,
            totalPrice,

            shippingAddress: {
                firstName: address.firstName,
                lastName: address.lastName,
                email: address.email,
                phone: address.phone,
                country: address.country,
                state: address.state,
                city: address.city,
                address: address.address,
                zip: address.zip
            },

            paymentMethod: "Paystack",
            paymentReference: payment.reference,
            paymentStatus: "Paid",
            orderStatus: "Pending"
        });

        await order.save();

        // Clear cart
        cart.cartItems = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Payment verified and order created successfully.",
            order
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.response?.data?.message || err.message
        });

    }
};

module.exports = {
    initializePayment,
    verifyPayment
};