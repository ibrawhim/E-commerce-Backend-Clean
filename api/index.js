const express = require("express");

const app = express();

require("dotenv").config({ quiet: true });

const connectDB = require("../connections/mongodb.connection");

const cors = require("cors");

// Routes
const addressRoute = require("../routes/address.route");
const userRoute = require("../routes/user.route");
const paymentRoute = require("../routes/payment.route");
const orderRoute = require("../routes/order.route");
const productRoute = require("../routes/product.route");
const profileRoute = require("../routes/profile.route");
const sellerProductRoute = require("../routes/sellerProduct.route");
const googleAuthRoute = require("../routes/googleAuth.route");

// Middleware
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        return res.status(503).json({
            success: false,
            message: "Unable to connect to the database. Please try again later."
        });
    }
});

// Routes
app.use("/", userRoute);

app.use("/", paymentRoute);

app.use("/", orderRoute);

app.use("/", addressRoute);

app.use("/", productRoute);

app.use("/", profileRoute);

app.use("/", sellerProductRoute);

app.use("/", googleAuthRoute);

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "eNaija Commerce API is running."
    });
});

// Handle Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

module.exports = app;