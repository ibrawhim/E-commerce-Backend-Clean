const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");

const {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/address.controller");

/**
 * Get saved address
 */
router.get(
    "/address",
    verifyToken,
    getAddress
);

/**
 * Save address
 */
router.post(
    "/address",
    verifyToken,
    createAddress
);

/**
 * Update address
 */
router.patch(
    "/address",
    verifyToken,
    updateAddress
);

/**
 * Delete address
 */
router.delete(
    "/address",
    verifyToken,
    deleteAddress
);

module.exports = router;