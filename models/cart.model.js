const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
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
                    default: 1,
                    min: 1,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

/**
 * Add one item to cart
 */
cartSchema.methods.addItem = function (item) {
    if (!item) {
        throw new Error("Item is required.");
    }

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
 * Remove item from cart
 */
cartSchema.methods.removeItem = function (itemId) {
    this.cartItems = this.cartItems.filter(
        item => item.itemId !== itemId
    );
};

/**
 * Update item quantity
 */
cartSchema.methods.updateQuantity = function (itemId, quantity) {

    const item = this.cartItems.find(
        item => item.itemId === itemId
    );

    if (!item) {
        throw new Error("Item not found.");
    }

    if (quantity <= 0) {
        this.removeItem(itemId);
    } else {
        item.quantity = quantity;
    }
};

/**
 * Clear cart
 */
cartSchema.methods.clearCart = function () {
    this.cartItems = [];
};

/**
 * Get cart items
 */
cartSchema.methods.getCart = function () {
    return this.cartItems;
};

module.exports = mongoose.model("cart", cartSchema);