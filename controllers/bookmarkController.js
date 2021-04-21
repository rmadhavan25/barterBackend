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
                    console.log("myBookmarks sent");
                    res.status(200).json(result);
                }
                else if(result == null){
                    console.log("No Bookmarks to list");
                    res.status(204).send("No Bookmarks to list. Add Bookmarks to view.");
                }
                else{
                    console.log(err);
                }
            })
        }
    });
};

const delete_bookmark = (req,res) => {
    const query = {bookmarkedProductId:req.body.bookmarkedProductId};

    Bookmark.deleteOne(query,(err,result) => {
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