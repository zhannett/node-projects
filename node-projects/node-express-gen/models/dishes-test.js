var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// create a schema in this way
/*{
 "name": "Uthapizza",
 "image": "images/uthapizza.png",
 "category": "mains",
 "label": "Hot",
 "price": "4.99",
 "description": "A unique . . .",
 "comments": [
 {
 "rating": 5,
 "comment": "Imagine all the eatables, living in conFusion!",
 "author": "John Lemon"
 },
 {
 "rating": 4,
 "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
 "author": "Paul McVites"
 }
 ]
 }*/

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
        default: ""
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;