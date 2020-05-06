var mongoose = require("mongoose");
var itemSchema = require("./ItemSchema.js")
var postSchema = new mongoose.Schema({
                  title: String, 
                  description: String, 
                  poster: {name: String, avatar: String}, 
                  location: String, 
                  items: [itemSchema], 
                  image: String
                 });
var Post = mongoose.model('Post', postSchema);
module.exports = Post;