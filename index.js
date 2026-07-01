const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home works");
});

app.post("/signup", (req, res) => {
    console.log("Reached signup");
    console.log(req.body);

    res.json({
        success: true,
        body: req.body
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server started");
});