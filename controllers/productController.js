const Product = require('../models/products');
const { v4: uuidv4 } = require('uuid');
var ObjectID = require('mongodb').ObjectID;

const insert_product = (req,res) => {
    console.log(req.body);
    const newProduct = new Product({
        productName: req.body.productName,
        productId: uuidv4(),
	    category: req.body.category,
	    description: req.body.description,
    	condition: req.body.condition,
	    desiredExchangeProduct: req.body.desiredExchangeProduct,
    	productOwnerName: req.body.productOwnerName,
        productOwnerPhone: req.body.productOwnerPhone,
	    productOwnerEmail: req.body.productOwnerEmail,
	    status: req.body.status,
	    requested: false
    });
    newProduct.save(function(err, newProduct) {
        if (err) return console.error(err);
        console.log("Product registered succussfully!");
      });
      res.status(200).send("done");
};

const get_products = (req,res) => {
    Product.find((err,result) => {
        if(err)
            console.log(err);
        else{
            if(result!=null)
                res.status(200).json(result);
            else    
                res.status(204).send("No products available");
        }
    })
};

const delete_product = (req,res) => {
    
    const _id = new ObjectID(req.body._id);

    Product.findOneAndDelete({_id:_id},(err,result) => {
        if(err)
            console.log(err);
        else{
            console.log(result);
            res.status(200).send("OK");
        }
            
    });
};

const get_myProducts = (req,res) => {     

    const query = {
        //since the data is passed as a parameter...req.query is used to access the value
        productOwnerPhone:req.query.productOwnerPhone
    }
    Product.find(query,(err,result) => {
        if(result!=null){
            //console.log(result);
            res.status(200).json(result);
        }
        else if(result == null){
            console.log("No products to list");
            res.status(204).send("No products to list. Add products to view.");
        }
        else{
            console.log(err);
        }
    })
};

module.exports = {
    insert_product,
    delete_product,
    get_products,
    get_myProducts
};