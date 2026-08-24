const signupModel = require("../models/signup.model");


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

module.exports = {
    getProfile
};