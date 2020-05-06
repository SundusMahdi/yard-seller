var mongoose = require("mongoose");
var itemSchema = new mongoose.Schema({
                  title: String, 
                  image: [{type: String}],
                  description: String,  
                  price: Number
                 });
module.exports = itemSchema;