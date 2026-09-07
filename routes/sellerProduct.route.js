const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const requireSeller = require("../middlewares/seller.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    createSellerProduct,
    getSellerProducts,
    getSellerProduct,
    updateSellerProduct,
    deleteSellerProduct
} = require("../controllers/sellerProduct.controller");

router.post(
    "/seller/products",
    verifyToken,
    requireSeller,
    upload.array("images", 5),
    createSellerProduct
);

router.get(
    "/seller/products",
    verifyToken,
    requireSeller,
    getSellerProducts
);

router.get(
    "/seller/products/:productId",
    verifyToken,
    requireSeller,
    getSellerProduct
);

router.patch(
    "/seller/products/:productId",
    verifyToken,
    requireSeller,
    upload.array("images", 5),
    updateSellerProduct
);

router.delete(
    "/seller/products/:productId",
    verifyToken,
    requireSeller,
    deleteSellerProduct
);

module.exports = router;

