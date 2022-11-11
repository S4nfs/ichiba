const express = require('express');
const { isAuthenticatedByJWT, adminMiddleware } = require('../common-middleware/index');
const { addCategory, getCategories, updateCategories } = require('../controller/category');
const router = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

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


router.post('/category/create', isAuthenticatedByJWT, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/update', upload.array('categoryImage'), updateCategories);


module.exports = router;