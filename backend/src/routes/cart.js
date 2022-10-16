const express = require('express');
const { isAuthenticatedByJWT, userMiddleware } = require('../common-middleware/index');
const { addItemToCart } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart', isAuthenticatedByJWT, userMiddleware, addItemToCart);


module.exports = router;