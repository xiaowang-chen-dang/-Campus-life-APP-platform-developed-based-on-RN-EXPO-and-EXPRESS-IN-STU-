const express = require('express');
const router = express.Router();

const oaController = require('../controllers/oaControllers');

const upload=require('../middlewares/multerMiddleware');

router.post('/getOa',oaController.getOa);

router.get('/showOas',oaController.showOas);

router.get('/downloadDocument',oaController.downloadDocuments)

router.post('/selectOas',oaController.selectOas)

module.exports = router;