const MyRequest = require('../models/myRequest');
var ObjectID = require('mongodb').ObjectID;

const add_request = (req,res) => {
    const newRequest = new MyRequest({
        userPhoneNumber: req.body.userPhoneNumber,
        requestedProductId: req.body.requestedProductId,
        requestedProductName: req.body.requestedProductName
    });
    
    newRequest.save((err,newRequest) => {
        if (err) return console.log(err);
        console.log("request saved successfully");
    });
    res.status(200).send("OK");
};

const get_requests = (req,res) => {
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
                    console.log("myRequests sent");
                    res.status(200).json(result);
                }
                else if(result == null){
                    console.log("No Requests to list");
                    res.status(204).send("No Requests to list. Add Requests to view.");
                }
                else{
                    console.log(err);
                }
            })
        }
    });
    
};

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
};

// const delete_request = (req,res) => {
//     const _id = new ObjectID(req.body._id);

//     MyRequest.findOneAndDelete({_id:_id},(err,result) => {
//         if(err)
//             console.log(err);
//         else{
//             console.log(result);
//             res.status(200).send("OK");
//         }
            
//     });
// };

const delete_request = (req,res) => {
    const query = {requestedProductId:req.body.requestedProductId};

    MyRequest.deleteOne(query,(err,result) => {
        if(err)
            console.log(err);
        else{
            console.log(result);
            res.status(200).send("OK");
        }
    });
};

module.exports = {
    add_request,
    get_requests,
    delete_request
}