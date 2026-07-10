const express = require('express');
const router = express.Router();
const { signupController, signinController } = require('../controllers/userInfos.controller');
const { addToCart, getCart, removeFromCart, updateQuantity, clearCart } = require('../controllers/cart.controller');



router.post('/signup', signupController);
router.post('/signin', signinController);
router.get('/cart/:userId', getCart)
router.post('/cart/addtocart', addToCart )
router.post('/cart/remove', removeFromCart)
router.post('/cart/update', updateQuantity)
router.post('/cart/clear', clearCart)




module.exports = router;