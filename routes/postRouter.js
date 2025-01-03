const express = require('express')
const router = express.Router()

const postController = require('../controllers/postController')
const verifyJWT = require('../middlewares/JWTMiddleware');
const middleWares=require('../middlewares/multerMiddleware')

router.put('/send',verifyJWT, middleWares.multerPostMiddleware,postController.sendPost)
//router.post('/edit', postController.editPostPage)
//router.post('/detail', postController.getPostDetail)
router.post('/comment', verifyJWT,postController.sendComment)
router.post('/getComments', postController.getComments)

module.exports = router 