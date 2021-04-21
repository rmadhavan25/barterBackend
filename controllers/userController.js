const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//to register new user
const register_user = (req,res) => {
    const hash = bcrypt.hashSync(req.body.password,saltRounds);


    //console.log(hash);

    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hash,
        address1: req.body.address1,
        address2: req.body.address2,
        age: req.body.age,
        gender: req.body.gender
    });

    user.save(function(err, user) {
        if (err) return console.error(err);
        console.log("User registered succussfully!");
      });
      res.status(200).send("done");
};

//to retrieve user table details
const user_details = (req,res) => {
    const query = {
        //since the data is passed as a parameter...req.query is used to access the value
        phone:req.query.phone
    };
    User.findOne(query,(err,result) => {
        if(result!=null){
            res.status(200).json(result);
        }
        else{
            console.log("no such user found");
            res.status(400).send();
        }
    })
};


//login
const user_login = (req,res) => {

    const query = {
        phone:req.body.phone,
    };
    
    const user = { 
        userPhone: req.body.phone
      }

    User.findOne(query,(err,result) => {
        if(result!=null){
            //res.status(200).send("OK");
            const isValidPass = bcrypt.compareSync(req.body.password,result.password);
            if(isValidPass){
                jwt.sign({user}, 'secretkey', (err, token) => {
                    res.json({
                      token
                    });
                  });
                console.log('success');
            }
            else{
                console.log("Invalid password");
                res.status(401).send('Invalid password');
            }
            
        }
        else{
            console.log("Invalid Login Credential");
            res.status(400).json('Invalid Login Credential');
        }
    })
}

module.exports = {
    register_user,
    user_details,
    user_login
};