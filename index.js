const express = require("express");
const app = express();

require("dotenv").config({ quiet: true });

require("./connections/mongodb.connection");

const cors = require("cors");

const PORT = process.env.PORT || 5000;

// Routes
const userRoute = require("./routes/user.route");
const paymentRoute = require("./routes/payment.route");
const orderRoute = require("./routes/order.route");

// Middleware
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Routes
app.use("/", userRoute);

app.use("/", paymentRoute);

app.use("/", orderRoute);

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

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});