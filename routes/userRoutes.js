const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


//to get a particular user detail
router.get('/user',userController.user_details);

//to register new user
router.post('/user',userController.register_user);

//to login
router.post('/user/login',userController.user_login);

module.exports = router;