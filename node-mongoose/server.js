var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    
    Dishes.create(
        {
            name: 'Uthapizza',
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
        },
        function (err, dish) {
            if (err) {
                throw err;
            }
            console.log('Dish created!');
            console.log(dish);
            
            var id = dish._id;
            
            // get all the dishes
            setTimeout(function () {
                Dishes.findByIdAndUpdate(
                    id,
                    {$set: {description: 'Updated Test for dishes'}},
                    {new: true}
                )
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);
                    
                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });
                    
                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);
                        
                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
            }, 3000);
        }
    );
    
    
    Promotions.create(
        {
            "name": "Weekend Grand Buffet",
            "image": "images/buffet.png",
            "label": "New",
            "price": "19.99",
            "description": "Featuring . . ."
        },
        function (err, promotion) {
            if (err) {
                throw err;
            }
            console.log('Promotions created!');
            console.log(promotion);
            
            var id = promotion._id;
            
            // get all the dishes
            setTimeout(function () {
                Promotions.findByIdAndUpdate(
                    id,
                    {$set: {description: 'Updated Test for Promotions'}},
                    {new: true}
                )
                .exec(function (err, promotion) {
                    if (err) {
                        throw err;
                    }
                    console.log('Updated Promotions!');
                    console.log(promotion);
    
                    promotion.save(function (err, promotion) {
                        console.log('Updated Promotion!');
                        console.log(promotion);
        
                        db.collection('promotions').drop(function () {
                            db.close();
                        });
                    });
                });
            }, 3000);
        }
    );
    
    
    Leaders.create(
        {
            "name": "Peter Pank",
            "image": "images/alberto.png",
            "designation": "Chief Epicurious Officer",
            "abbr": "CEO",
            "description": "Our CEO, Peter, . . ."
        },
        function (err, leader) {
            if (err) {
                throw err;
            }
            console.log('Leaders created!');
            console.log(leader);
            
            var id = leader._id;
           
            setTimeout(function () {
                Leaders.findByIdAndUpdate(
                    id,
                    {$set: { description: 'Updated Test for Leaders'}},
                    {new: true }
                )
                .exec(function (err, leader) {
                    if (err) {
                        throw err;
                    }
                    console.log('Updated Leaders!');
                    console.log(leader);
    
                    leader.save(function (err, leader) {
                        console.log('Updated Leader!');
                        console.log(leader);
        
                        db.collection('leadership').drop(function () {
                            db.close();
                        });
                    });
                });
            }, 3000);
        }
    );
});