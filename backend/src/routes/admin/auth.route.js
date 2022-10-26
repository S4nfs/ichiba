const express = require('express');
const { isAuthenticatedByJWT } = require('../../common-middleware');
const { signup, signin, signout } = require('../../controller/admin/auth')
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', isAuthenticatedByJWT, signout);



module.exports = router;