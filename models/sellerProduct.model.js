const mongoose = require("mongoose");

const sellerProductSchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "signup",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        tags: {
            type: [String],
            default: [],
        },

        brand: {
            type: String,
            default: "",
            trim: true,
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        weight: {
            type: Number,
            default: 0,
        },

        dimensions: {
            width: {
                type: Number,
                default: 0,
            },

            height: {
                type: Number,
                default: 0,
            },

            depth: {
                type: Number,
                default: 0,
            },
        },

        warrantyInformation: {
            type: String,
            default: "",
        },

        shippingInformation: {
            type: String,
            default: "",
        },

        availabilityStatus: {
            type: String,
            default: "In Stock",
        },

        reviews: [
            {
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },

                comment: {
                    type: String,
                    default: "",
                },

                date: {
                    type: Date,
                    default: Date.now,
                },

                reviewerName: {
                    type: String,
                    default: "",
                },

                reviewerEmail: {
                    type: String,
                    default: "",
                },
            },
        ],

        returnPolicy: {
            type: String,
            default: "",
        },

        minimumOrderQuantity: {
            type: Number,
            default: 1,
            min: 1,
        },

        meta: {
            createdAt: {
                type: Date,
                default: Date.now,
            },

            updatedAt: {
                type: Date,
                default: Date.now,
            },

            barcode: {
                type: String,
                default: "",
            },

            qrCode: {
                type: String,
                default: "",
            },
        },

        images: {
            type: [String],
            default: [],
        },

        thumbnail: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const sellerProductModel = mongoose.model(
    "sellerProduct",
    sellerProductSchema
);

module.exports = sellerProductModel;