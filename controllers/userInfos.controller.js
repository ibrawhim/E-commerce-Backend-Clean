const signupModel = require("../models/signup.model");
const jwt = require("jsonwebtoken");

require("dotenv").config({ quiet: true });

/**
 * Signup
 */
const signupController = (req, res) => {
    const form = new signupModel(req.body);

    form.save()
        .then((data) => {
            res.json({
                success: true,
                message: "Signup Successful",
                data
            });
        })
        .catch((err) => {
            console.log(err);

            res.status(500).json({
                success: false,
                message: err.message
            });
        });
};

/**
 * Signin
 */
const signinController = (req, res) => {

    const { email, password } = req.body;

    signupModel.findOne({ email })

        .then((user) => {

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Email not found."
                });
            }

            user.validatePassword(password, (err, same) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (!same) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid Password."
                    });
                }

                const secret = process.env.SECRET;

                const token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    },
                    secret,
                    {
                        expiresIn: "24h"
                    }
                );

                const userData = user.toObject();

                delete userData.password;

                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    data: userData,
                    token
                });

            });

        })

        .catch((err) => {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: err.message
            });

        });

};

/**
 * Become Seller
 */
const becomeSeller = async (req, res) => {

    try {

        const user = await signupModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role === "Seller") {
            return res.status(400).json({
                success: false,
                message: "You are already a seller."
            });
        }

        if (user.role === "Admin") {
            return res.status(400).json({
                success: false,
                message: "Admin accounts cannot become sellers."
            });
        }

        user.role = "Seller";

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.SECRET,
            {
                expiresIn: "24h"
            }
        );

        const userData = user.toObject();

        delete userData.password;

        return res.status(200).json({
            success: true,
            message: "Congratulations! You are now a seller.",
            data: userData,
            token
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    signupController,
    signinController,
    becomeSeller
};