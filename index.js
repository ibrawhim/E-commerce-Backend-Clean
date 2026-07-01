const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/user.route");

app.use("/", userRoute);

app.get("/", (req, res) => {
    res.send("Home works");
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log("Server running");
// });

module.exports = app;