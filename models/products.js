const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    productName:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    desiredExchangeProduct:{
        type:String,
        required:true
    },
    productOwnerName:{
        type:String,
        required:true
    },
    productOwnerPhone:{
        type:Number,
        required:true
    },
    productOwnerEmail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    requested:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

const product = mongoose.model('product',productSchema);
module.exports = product;


/*{
	"productName": "iphone 12",
	"category": "electronics",
	"description": "designed by apple",
	"condition": "good",
	"desiredExchangeProduct": "ps5",
	"productOwnerName": "maddy",
	"productOwnerPhone": 9655569935,
	"productOwnerEmail": "rmadhavan718@gmail.com",
	"status": "not sold",
	"requested": false
}*/