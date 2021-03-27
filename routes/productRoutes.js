const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//product details posting
router.post('/products',productController.insert_product);

//get all products
router.get('/products',productController.get_products);

//delete a product
router.delete('/products',productController.delete_product);

//get products of a particular user
router.get('/myProducts',productController.get_myProducts);



module.exports = router;