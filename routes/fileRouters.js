const express = require('express');
const router = express.Router();

const fileControllers = require('../controllers/fileControllers');

router.get('/uploads/*', fileControllers.downloadFile);

module.exports = router;