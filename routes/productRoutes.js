const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../config/auth');

//product details posting
router.post('/products',verifyToken,productController.insert_product);

//get all products
router.get('/products',productController.get_products);

//delete a product
router.delete('/products',productController.delete_product);

//get products of a particular user
router.get('/myProducts',verifyToken,productController.get_myProducts);

//request a product
router.get('/request',productController.request_a_product);

//get a specific product
router.get('./product',productController.get_a_product);



module.exports = router;