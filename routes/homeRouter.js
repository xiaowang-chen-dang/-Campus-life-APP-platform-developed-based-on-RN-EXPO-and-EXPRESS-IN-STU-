const express = require('express');
const router = express.Router();

const homeControllers = require('../controllers/homeController');

router.post('/getPosts',homeControllers.getPosts)
router.post('/getLostFounds',homeControllers.getPublicLostFounds)
router.post('/getTwoHands',homeControllers.getPublicTwoHands)

module.exports = router;