const express = require("express")
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/categories', categoriesController.getAllCategories);
router.get('/categoryById', categoriesController.getCategoryById);

module.exports = router;