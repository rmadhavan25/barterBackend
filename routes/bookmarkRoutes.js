const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');


//to add bookmark
router.post('/bookmark',bookmarkController.add_bookmark);

//to get the all the bookmarks of a user
router.get('/bookmark',bookmarkController.get_bookmarks);

//to delete a particular bookmark
router.delete('/bookmark',bookmarkController.delete_bookmark);


module.exports = router;