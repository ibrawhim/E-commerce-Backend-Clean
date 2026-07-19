const Address = require("../models/address.model");

/**
 * Create Address
 * POST /address
 */
const createAddress = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingAddress = await Address.findOne({ userId });

        if (existingAddress) {
            return res.status(400).json({
                success: false,
                message: "Address already exists. Please update it instead."
            });
        }

        const address = await Address.create({
            userId,
            ...req.body
        });

        res.status(201).json({
            success: true,
            message: "Address saved successfully.",
            address
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Get Address
 * GET /address
 */
const getAddress = async (req, res) => {
    try {
        const userId = req.user.id;

        const address = await Address.findOne({ userId });

        if (!address) {
            return res.status(200).json({
                success: true,
                address: null
            });
        }

        res.status(200).json({
            success: true,
            address
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Update Address
 * PATCH /address
 */
const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;

        const address = await Address.findOneAndUpdate(
            { userId },
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully.",
            address
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Delete Address
 * DELETE /address
 */
const deleteAddress = async (req, res) => {
    try {
        const userId = req.user.id;

        const address = await Address.findOneAndDelete({
            userId
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress
};