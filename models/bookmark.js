const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bookmarkSchema = new schema({
    userPhoneNumber: {
        type: Number,
        required:true
    },
    bookmarkedProductId: {
        type: String,
        required:true
    },
    bookmarkedProductName: {
        type: String,
        required: true
    }
},{timestamps:true});

const bookmark = mongoose.model('bookmark',bookmarkSchema);
module.exports = bookmark;