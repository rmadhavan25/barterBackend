const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true
    },
    address2:{
        type:String
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        lowercase:true,
        required:false
    }
},{timestamps: true})

const user = mongoose.model('user',userSchema);
module.exports = user;

/*{
	"name":"abishek",
	"phone":"1234567890",
	"email":"abishek@gmail.com",
	"password":"abishke1234",
	"address1":"abc",
	"age":20
}*/