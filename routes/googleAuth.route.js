const express = require("express");

const router = express.Router();

const {
    googleAuth
} = require("../controllers/googleAuth.controller");

router.post(
    "/google/auth",
    googleAuth
);

module.exports = router;