const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController");

router.get('/users', userController.getAllUsers);
router.get('/userById/:user_id',userController.getUserById);
router.post('/deleteUserById/:user_id',userController.deleteUserById);
router.post('/updateUser/:user_id',userController.updateUser);

module.exports = router;