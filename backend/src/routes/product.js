const express = require('express');
const { isAuthenticatedByJWT, adminMiddleware } = require('../common-middleware/index');
const { createProduct } = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path')

//multer to store uploads and generation shortid
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });


router.post('/product/create', isAuthenticatedByJWT, adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/category/getcategory', getCategories);


module.exports = router;