const Cart = require("../models/cart.model");

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

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
            message: "Item(s) added to cart successfully.",
            cart
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: [],
            });
        }

        res.status(200).json({
            success: true,
            cart: cart.getCart(),
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        await cart.removeItem(itemId);

        res.status(200).json({
            success: true,
            message: "Item removed from cart.",
            cart,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update quantity
const updateQuantity = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        await cart.updateQuantity(itemId, quantity);

        res.status(200).json({
            success: true,
            message: "Quantity updated.",
            cart,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Clear cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        await cart.clearCart();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully.",
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart,
};