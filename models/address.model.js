const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "signup",
            required: true,
            unique: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        zip: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

/**
 * Create Address
 */
addressSchema.statics.createAddress = async function (
    userId,
    addressData
) {
    const existing = await this.findOne({ userId });

    if (existing) {
        throw new Error("Address already exists.");
    }

    return await this.create({
        userId,
        ...addressData
    });
};

/**
 * Get Address
 */
addressSchema.statics.getAddress = async function (
    userId
) {
    return await this.findOne({ userId });
};

/**
 * Update Address
 */
addressSchema.statics.updateAddress = async function (
    userId,
    addressData
) {
    return await this.findOneAndUpdate(
        { userId },
        {
            $set: addressData
        },
        {
            new: true,
            runValidators: true
        }
    );
};

/**
 * Delete Address
 */
addressSchema.statics.deleteAddress = async function (
    userId
) {
    return await this.findOneAndDelete({
        userId
    });
};

module.exports = mongoose.model(
    "address",
    addressSchema
);