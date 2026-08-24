const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/profile.controller");

/*
|--------------------------------------------------------------------------
| User Profile Routes
|--------------------------------------------------------------------------
*/

router.get(
    "/profile",
    verifyToken,
    getProfile
);

router.patch(
    "/profile",
    verifyToken,
    updateProfile
);

module.exports = router;