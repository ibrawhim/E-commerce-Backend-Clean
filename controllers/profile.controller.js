const signupModel = require("../models/signup.model");

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
    try {
        const userId = req.user.id;

        const {
            firstName,
            lastName,
            email
        } = req.body;

        const user = await signupModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (firstName !== undefined) {
            user.firstName = firstName;
        }

        if (lastName !== undefined) {
            user.lastName = lastName;
        }

        if (email !== undefined) {
            const existingUser = await signupModel.findOne({
                email,
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

        const userData = user.toObject();

        delete userData.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: userData
        });

    } catch (err) {
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