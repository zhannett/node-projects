var express = require('express');
var bodyParser = require('body-parser');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

/* Route '/' */

favoriteRouter.route('/')
    
    .all(Verify.verifyOrdinaryUser)
    
    .get(function (req, res) {
        Favorites.find({postedBy: req.decoded._doc._id})
            .populate('postedBy dishes')
            .exec(function (err, dish) {
                if (err) {
                    throw err;
                }
                res.json(dish)
            })
    })
    
    .post(function (req, res) {
        Favorites.find({'postedBy': req.decoded._doc._id}, function(err, favorites) {
            if (err) {
                throw err;
            }
            req.body.postedBy = req.decoded._doc._id;
        
            if (favorites.length === 0) {
                Favorites.create(
                    {postedBy: req.decoded._doc._id},
                    function (err, favorites) {
                        if (err) {
                            throw err;
                        }
                        favorites.dishes.push(req.body._id);
                        favorites.save(function (err, favorites) {
                            if (err) {
                                throw err;
                            }
                            console.log('Something is up!');
                            res.json(favorites);
                        });
                    }
                );
            } else {
                Favorites.update(
                    {postedBy: req.body.postedBy},
                    {$addToSet: {dishes: req.body._id}},
                    function (err, favorites) {
                        if (err) {
                            throw err;
                        }
                        res.json(favorites);
                    }
                );
            }
        });
    })
    
    .delete(function (req, res) {
        Favorites.remove(
            {postedBy: req.decoded._doc._id },
            function (err, fav) {
                if (err) {
                    throw err;
                }
                res.json(fav);
            }
        );
    });

favoriteRouter.route('/:favoriteId')
    Favorites.find(
        {"postedBy":req.decoded._id},
        function(err, favorite) {
            if (err) {
                throw err;
            }
            favorite.update({$pull: {dishes: req.params.dishId}},
                function(err, favorite) {
                    if  (err) {
                        throw err;
                    }
                    res.json(favorite);
                }
            );
        }
    );


module.exports = favoriteRouter;