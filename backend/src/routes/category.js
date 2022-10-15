const express = require('express');
const { isAuthenticatedByJWT, adminMiddleware } = require('../common-middleware/index');
const { addCategory, getCategories } = require('../controller/category');
const router = express.Router();

router.post('/category/create', isAuthenticatedByJWT, adminMiddleware, addCategory);
router.get('/category/getcategory', getCategories);


module.exports = router;