const express = require('express');
//const DBuri = "mongodb+srv://maddy:{passwod}@cluster0.gdw0x.mongodb.net/barter?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');


const app = express();


//connecting DB
mongoose.connect(DBuri,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result) => {
        app.listen(3000);
        console.log("server is running");
    })
    .catch((err) => console.log(err))


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/',(req,res) => {
    res.send("hello");
})
//user routes
app.use(userRoutes);

//product routes
app.use(productRoutes);

//bookmark routes
app.use(bookmarkRoutes);
