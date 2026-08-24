const signupModel = require("../models/signup.model");
const jwt = require("jsonwebtoken");

/**
 * Get logged-in user's profile
 * GET /profile
 */
const getProfile = async (req, res) => {
    try {
        const user = await signupModel
            .findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile retrieved successfully.",
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


/**
 * Update logged-in user's profile
 * PATCH /profile
 */
const updateProfile = async (req, res) => {
    console.log("User ID:", userId);
    console.log("Update body:", req.body);
    try {

        const userId = req.user.id;

        const {
            firstName,
            lastName,
            email
        } = req.body;

        console.log("User ID:", userId);
        console.log("Update body:", req.body);

        const user = await signupModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Update first name
        if (firstName !== undefined) {
            user.firstName = firstName;
        }

        // Update last name
        if (lastName !== undefined) {
            user.lastName = lastName;
        }

        // Update email
        if (email !== undefined) {

            const existingUser = await signupModel.findOne({
                email: email,
                _id: { $ne: userId }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already in use."
                });
            }

            user.email = email;
        }

        await user.save();

        // Get the updated user directly from database
        const updatedUser = await signupModel
            .findById(userId)
            .select("-password");

        // Generate new token with updated information
        const token = jwt.sign(
            {
                id: updatedUser._id,
                email: updatedUser.email,
                role: updatedUser.role
            },
            process.env.SECRET,
            {
                expiresIn: "24h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: updatedUser,
            token
        });

    } catch (err) {

        console.log("Profile update error:", err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};