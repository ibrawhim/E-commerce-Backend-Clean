const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "signup",
        required: true,
    },
    cartItems: [
        {
            itemId: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            brand: {
                type: String,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },
        },
    ],
}, { timestamps: true });

/**
 * Add item to cart
 * If the item already exists, increase its quantity.
 */
cartSchema.methods.addItem = function (item) {
    const existingItem = this.cartItems.find(
        cartItem => cartItem.itemId === item.itemId
    );

    if (existingItem) {
        existingItem.quantity += item.quantity || 1;
    } else {
        this.cartItems.push(item);
    }
};

/**
 * Remove an item from the cart using its itemId
 */
cartSchema.methods.removeItem = async function (itemId) {
    this.cartItems = this.cartItems.filter(
        item => item.itemId !== itemId
    );

    return await this.save();
};

/**
 * Get all cart items
 */
cartSchema.methods.getCart = function () {
    return this.cartItems;
};

/**
 * Empty the cart
 */
cartSchema.methods.clearCart = async function () {
    this.cartItems = [];
    return await this.save();
};

cartSchema.methods.updateQuantity = async function (itemId, quantity) {
    const item = this.cartItems.find(
        item => item.itemId === itemId
    );

    if (!item) {
        throw new Error("Item not found.");
    }

    item.quantity = quantity;

    return await this.save();
};

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;