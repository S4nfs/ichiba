const router = require('express').Router();
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { createPage } = require('../../controller/admin/page');
const { isAuthenticatedByJWT, adminMiddleware } = require('../../common-middleware');

//multer to store uploads and generation shortid
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), '../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/page/create', isAuthenticatedByJWT, adminMiddleware, upload.fields([     //multer field
    { name: 'banners' },
    { name: 'products' }
]), createPage);

module.exports = router;