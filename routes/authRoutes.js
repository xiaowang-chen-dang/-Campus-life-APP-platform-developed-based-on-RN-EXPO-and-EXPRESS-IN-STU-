// authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verifyJWT = require('../middlewares/JWTMiddleware');
const upload=require('../middlewares/multerMiddleware');

router.post('/login', authController.login);

router.post('/register',authController.register);

//router.put('/update-profile', verifyJWT, upload, authController.updateProfile);

router.post('/getVerificationCode',authController.generateVerificationCode);

router.post('/remakePwd',verifyJWT,authController.remakePwd);

module.exports = router;
