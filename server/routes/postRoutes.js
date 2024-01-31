const express = require("express")
const router = express.Router();
const postController = require("../controllers/postController");

router.get('/getPostById', postController.getPostByPostId);
router.post('/deletePostById', postController.deletePostById);

module.exports = router;


