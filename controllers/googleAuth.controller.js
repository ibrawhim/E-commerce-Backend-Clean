const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const signupModel = require("../models/signup.model");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (user) => {
    return jwt.sign(
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
};

const googleAuth = async (req, res) => {
    try {
        const { credential, mode } = req.body;

        if (!credential) {
            return res.status(400).json({
                success: false,
                message: "Google credential is required."
            });
        }

        if (!["signup", "signin"].includes(mode)) {
            return res.status(400).json({
                success: false,
                message: "Invalid authentication mode."
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                success: false,
                message: "Unable to verify Google account."
            });
        }

        const {
            sub: googleId,
            email,
            given_name: firstName,
            family_name: lastName,
            email_verified: emailVerified
        } = payload;

        if (!email || !emailVerified) {
            return res.status(400).json({
                success: false,
                message: "A verified Google email is required."
            });
        }

        const existingUser = await signupModel.findOne({
            email: email.toLowerCase()
        });

        if (mode === "signin") {
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "No account exists with this Google email. Please sign up first."
                });
            }

            if (
                existingUser.authProvider === "local" &&
                !existingUser.googleId
            ) {
                return res.status(409).json({
                    success: false,
                    message: "An account already exists with this email. Please sign in with your email and password."
                });
            }

            if (!existingUser.googleId) {
                existingUser.googleId = googleId;
                existingUser.authProvider = "google";
                await existingUser.save();
            }

            const token = createToken(existingUser);

            const userData = existingUser.toObject();
            delete userData.password;

            return res.status(200).json({
                success: true,
                message: "Signed in with Google successfully.",
                data: userData,
                token
            });
        }

        if (existingUser) {
            if (
                existingUser.authProvider === "local" &&
                !existingUser.googleId
            ) {
                return res.status(409).json({
                    success: false,
                    message: "An account already exists with this email. Please sign in with your email and password first."
                });
            }

            if (!existingUser.googleId) {
                existingUser.googleId = googleId;
                existingUser.authProvider = "google";
                await existingUser.save();
            }

            const token = createToken(existingUser);

            const userData = existingUser.toObject();
            delete userData.password;

            return res.status(200).json({
                success: true,
                message: "Account already exists. Signed in with Google.",
                data: userData,
                token
            });
        }

        const user = await signupModel.create({
            firstName: firstName || "",
            lastName: lastName || "",
            email: email.toLowerCase(),
            googleId,
            authProvider: "google",
            role: "Customer"
        });

        const token = createToken(user);

        const userData = user.toObject();
        delete userData.password;

        return res.status(201).json({
            success: true,
            message: "Account created with Google successfully.",
            data: userData,
            token
        });
    } catch (error) {
        console.error("Google authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Google authentication failed."
        });
    }
};

module.exports = {
    googleAuth
};