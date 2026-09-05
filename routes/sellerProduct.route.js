const express = require("express");

const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware");
const requireSeller = require("../middlewares/seller.middleware");

const {
    createSellerProduct,
    getSellerProducts,
    getSellerProduct,
    updateSellerProduct,
    deleteSellerProduct
} = require("../controllers/sellerProduct.controller");


/*
|--------------------------------------------------------------------------
| Seller Product Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/seller/products",
    verifyToken,
    requireSeller,
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
    updateSellerProduct
);

router.delete(
    "/seller/products/:productId",
    verifyToken,
    requireSeller,
    deleteSellerProduct
);


module.exports = router;