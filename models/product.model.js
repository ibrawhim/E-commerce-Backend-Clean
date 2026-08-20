const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            default: ""
        },

        sku: {
            type: String,
            unique: true,
            sparse: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        discountPercentage: {
            type: Number,
            default: 0
        },

        stock: {
            type: Number,
            default: 0
        },

        minimumOrderQuantity: {
            type: Number,
            default: 1
        },

        weight: {
            type: Number,
            default: 0
        },

        rating: {
            type: Number,
            default: 0
        },

        images: [
            {
                type: String
            }
        ],

        thumbnail: {
            type: String,
            default: ""
        },

        tags: [
            {
                type: String
            }
        ],

        dimensions: {
            width: {
                type: Number,
                default: 0
            },
            height: {
                type: Number,
                default: 0
            },
            depth: {
                type: Number,
                default: 0
            }
        },

        warrantyInformation: {
            type: String,
            default: ""
        },

        shippingInformation: {
            type: String,
            default: ""
        },

        availabilityStatus: {
            type: String,
            enum: [
                "In Stock",
                "Low Stock",
                "Out of Stock"
            ],
            default: "In Stock"
        },

        returnPolicy: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive"
            ],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);