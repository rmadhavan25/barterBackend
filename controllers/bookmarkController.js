const Bookmark = require('../models/bookmark');
var ObjectID = require('mongodb').ObjectID;

const add_bookmark = (req,res) => {
    const newBookmark = new Bookmark({
        userPhoneNumber: req.body.userPhoneNumber,
        bookmarkedProductId: req.body.bookmarkedProductId,
        bookmarkedProductName: req.body.bookmarkedProductName
    });
    
    newBookmark.save((err,newBookmark) => {
        if (err) return console.log(err);
        console.log("bookmark saved successfully");
    });
    res.status(200).send("OK");
};

const get_bookmarks = (req,res) => {
    const query = {
        userPhoneNumber: req.query.userPhoneNumber,
    };

    Bookmark.find(query,(err,result) => {
        if(err)
            console.log(err);
        else{
            if(result!=null)
                res.status(200).json(result);
            else
                res.status(204).send("No Bookmarks yet!");
        }
    });
};

const delete_bookmark = (req,res) => {
    const _id = new ObjectID(req.body._id);

    Bookmark.findOneAndDelete({_id:_id},(err,result) => {
        if(err)
            console.log(err);
        else{
            console.log(result);
            res.status(200).send("OK");
        }
            
    });
};

module.exports = {
    add_bookmark,
    get_bookmarks,
    delete_bookmark
}