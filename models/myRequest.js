const mongoose = require('mongoose');
const schema = mongoose.Schema;

const myRequestSchema = new schema({
    userPhoneNumber: {
        type: Number,
        required:true
    },
    requestedProductId: {
        type: String,
        required:true
    },
    requestedProductName: {
        type: String,
        required: true
    }
},{timestamps:true});

const myRequest = mongoose.model('myRequest',myRequestSchema);
module.exports = myRequest;