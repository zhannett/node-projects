var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

var passport = require('passport');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        User.find({}, function (err, user) {
            if (err) {
                throw err;
            }
            res.json(user);
        });
    });
router.route('/')
    .delete(function(req, res, next) { //Verify.verifyOrdinaryUser,
        User.remove({}, function (err, resp) {
            if (err) {
                throw err;
            }
            res.json(resp);
        });
    });

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            if(req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if(req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            user.save(function(err,user) {
                passport.authenticate('local')(req, res, function () {
                    return res.status(200).json({status: 'Registration Successful!'});
                });
            });
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {if (err) {
            return res.status(500).json({
                err: 'Could not log in user'
            });
        }
    
            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


router.get('/facebook', passport.authenticate('facebook'), function(req, res){});

router.get('/facebook/callback', function(req,res,next) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req,res,next);
});
module.exports = router;



