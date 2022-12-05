const express = require('express');
const { isAuthenticatedByJWT, adminMiddleware } = require('../../common-middleware');
const { initialData } = require('../../controller/admin/initialData');

const router = express.Router();

router.post('/initialdata', isAuthenticatedByJWT, adminMiddleware, initialData);



module.exports = router;