const express = require("express")
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/categories', categoriesController.getAllCategories);
router.get('/categoryById', categoriesController.getCategoryById);
router.post('/deleteCategoryById', categoriesController.deleteCategoryById);
router.post('/createCategory', categoriesController.createCategory);

module.exports = router;