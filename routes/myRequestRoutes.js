const express = require('express');
const router = express.Router();
const myRequestController = require('../controllers/myRequestController');
const verifyToken = require('../config/auth');


//to add request
router.post('/request',myRequestController.add_request);

//to get the all the requests of a user
router.get('/request',verifyToken,myRequestController.get_requests);

//to delete a particular request
router.delete('/request',myRequestController.delete_request);


module.exports = router;