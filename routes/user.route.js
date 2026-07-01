const express = require("express");
const router = express.Router();

console.log("User routes loaded");

router.post("/signup", (req, res) => {
    console.log("Route reached");
    console.log(req.body);

    return res.json({
        message: "Signup works",
        body: req.body
    });
});

module.exports = router;