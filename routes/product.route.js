const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product.controller");

/**
 * Get all products
 */
router.get(
    "/products",
    getProducts
);

/**
 * Get one product
 */
router.get(
    "/products/:productId",
    getProduct
);

/**
 * Create product
 */
router.post(
    "/products",
    verifyToken,
    createProduct
);

/**
 * Update product
 */
router.patch(
    "/products/:productId",
    verifyToken,
    updateProduct
);

/**
 * Delete product (Soft Delete)
 */
router.delete(
    "/products/:productId",
    verifyToken,
    deleteProduct
);

module.exports = router;