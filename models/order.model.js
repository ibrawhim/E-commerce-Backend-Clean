const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "signup",
            required: true,
        },

        orderItems: [
            {
                itemId: {
                    type: String,
                    required: true,
                },

                title: {
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

                image: {
                    type: String,
                },

                weight: {
                    type: Number,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        totalItems: {
            type: Number,
            required: true,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        shippingAddress: {
            firstName: {
                type: String,
                required: true,
            },

            lastName: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },

            country: {
                type: String,
                required: true,
            },

            state: {
                type: String,
                required: true,
            },

            city: {
                type: String,
                required: true,
            },

            address: {
                type: String,
                required: true,
            },
        },

        paymentMethod: {
            type: String,
            enum: ["Paystack"],
            default: "Paystack",
        },

        paymentReference: {
            type: String,
            default: "",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;