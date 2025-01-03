const express = require('express');
const router = express.Router();

const mineControllers = require('../controllers/mineController');
const verifyJWT = require('../middlewares/JWTMiddleware');

router.post('/getLostFounds',verifyJWT,mineControllers.getLostFounds);
router.post('/getTwoHands',verifyJWT,mineControllers.getTwoHands);

module.exports = router;