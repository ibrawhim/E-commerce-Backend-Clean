
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

const {
    getMarketplaceProducts
} = require("../controllers/sellerProduct.controller");

router.get(
    "/marketplace/products",
    getMarketplaceProducts
);

router.get(
    "/products",
    getProducts
);

router.get(
    "/products/:productId",
    getProduct
);

router.post(
    "/products",
    verifyToken,
    createProduct
);

router.patch(
    "/products/:productId",
    verifyToken,
    updateProduct
);

router.delete(
    "/products/:productId",
    verifyToken,
    deleteProduct
);

module.exports = router;