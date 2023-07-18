const express = require('express');
const { isAuthenticatedByJWT, userMiddleware } = require('../common-middleware/index');
const { addItemToCart, getCartItems } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart', isAuthenticatedByJWT, userMiddleware, addItemToCart);
router.post('/user/getCartItems', isAuthenticatedByJWT, userMiddleware, getCartItems);


module.exports = router;