const Product = require('../models/products');
const { v4: uuidv4 } = require('uuid');
var ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

const insert_product = (req,res) => {
    console.log(req.body);
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            console.log(authData);
            const newProduct = new Product({
                productName: req.body.productName,
                productId: uuidv4(),
                category: req.body.category,
                description: req.body.description,
                condition: req.body.condition,
                desiredExchangeProduct: req.body.desiredExchangeProduct,
                productOwnerName: req.body.productOwnerName,
                productOwnerPhone: authData.user.userPhone,
                productOwnerEmail: req.body.productOwnerEmail,
                status: req.body.status,
                requested: false,
                requestedExchange: req.body.requestedExchange
            });
            newProduct.save(function(err, newProduct) {
                if (err) return console.error(err);
                console.log("Product registered succussfully!");
              });
              res.status(200).send("done");
        }
      });
    
};

const get_products = (req,res) => {
    Product.find((err,result) => {
        if(err)
            console.log(err);
        else{
            if(result!=null){
                console.log("products sent");
                res.status(200).json(result);
            }
            else    
                res.status(204).send("No products available");
        }
    })
};

const delete_product = (req,res) => {
    
    const query = {productId:req.body.productId};

    Product.deleteOne(query,(err,result) => {
        if(err)
            console.log(err);
        else{
            console.log(result);
            console.log("deletion successful");
            res.status(200).send("OK");
        }
            
    });
};

const get_myProducts = (req,res) => {     

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        }
        else{
            const query = {
                //since the data is passed as a parameter...req.query is used to access the value
                productOwnerPhone:authData.user.userPhone
            }
            Product.find(query,(err,result) => {
                if(result!=null){
                    console.log("myProducts sent");
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
        }
    });
    
};

//look into it-18-04-2021
const request_a_product = (req,res) => {
    const _id = new ObjectID(req.body._id);

    Product.findByIdAndUpdate({_id:_id},{requested: true},(err,result) => {
        if(err)
            console.log(err);
        else{
            
            console.log("request successful");
            res.status(200).send("OK");
        }
            
    });
}

const get_a_product = (req,res) => {
    const query = {productId:req.body.productId};

    Product.findOne(query,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.status(200).json(result);
        }
    })
}

module.exports = {
    insert_product,
    delete_product,
    get_products,
    get_myProducts,
    request_a_product,
    get_a_product
};