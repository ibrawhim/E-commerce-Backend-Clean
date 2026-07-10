const Cart = require("../models/cart.model");

/**
 * Add item(s) to cart
 */
const addToCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const { cartItems } = req.body;

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No cart items provided."
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                cartItems: []
            });
        }

        cartItems.forEach(item => {
            cart.addItem(item);
        });

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item(s) added successfully.",
            cart
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


/**
 * Get Cart
 */
const getCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });

        if (!cart) {

            return res.status(200).json({
                success: true,
                cart: {
                    userId,
                    cartItems: []
                }
            });

        }

        res.status(200).json({
            success: true,
            cart
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/**
 * Remove Item
 */
const removeFromCart = async (req, res) => {

    try {

        const userId = req.user.id;
        const { itemId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });

        }

        cart.removeItem(itemId);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed successfully.",
            cart
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/**
 * Update Quantity
 */
const updateQuantity = async (req, res) => {

    try {

        const userId = req.user.id;
        const { itemId, quantity } = req.body;

        if (quantity < 0) {

            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative."
            });

        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });

        }

        cart.updateQuantity(itemId, quantity);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated successfully.",
            cart
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


/**
 * Clear Cart
 */
const clearCart = async (req, res) => {

    try {

        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });

        }

        cart.clearCart();

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully.",
            cart
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart
};