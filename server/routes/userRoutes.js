const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.get('/auth/userById/:user_id', userController.getUserById);
router.post('/deleteUserById/:user_id', userController.deleteUserById);
router.post('/updateUser/:user_id', userController.updateUser);
router.post('/auth/createUser', userController.createUser);
// Added by Zaheer for ZK-03
router.post('/auth/login', userController.login);

module.exports = router;
