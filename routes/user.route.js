const express = require("express");
const router = express.Router();

const {
    signupController,
    signinController
} = require("../controllers/userInfos.controller");

const {
    addToCart,
    getCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = require("../controllers/cart.controller");

const verifyToken = require("../middlewares/auth.middleware");

// Authentication
router.post("/signup", signupController);
router.post("/signin", signinController);

// Cart
router.get("/cart", verifyToken, getCart);

router.post("/cart/addtocart", verifyToken, addToCart);

router.patch("/cart/update", verifyToken, updateQuantity);

router.delete("/cart/remove/:itemId", verifyToken, removeFromCart);

router.delete("/cart/clear", verifyToken, clearCart);

module.exports = router;