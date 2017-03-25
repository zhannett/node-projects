var express = require('express');
var promoRouter = express.Router();
var bodyParser = require('body-parser');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(function (req, res, next) {
        Promotions.find({}, function (err, promotion) {
            if (err) {
                throw err;
            }
            res.json(promotion);
        });
    })
    /*
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function(req, res, next) {
        res.end('Will send all the promotions to you');
    })
    */
    .post(function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err) {
                throw err;
            }
            console.log('Promotion created!');
            var id = promotion._id;
            res.writeHead(200, {'Content-Type': 'text/plain' });
            res.end('Added the promotion with id: ' + id);
        });
    })
    /*
    .post(function(req, res, next) {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })
    */
    .delete(function (req, res, next) {
        Promotions.remove({}, function (err, resp) {
            if (err) {
                throw err;
            }
            res.json(resp);
        });
    });
    /*
    .delete(function(req, res, next) {
        res.end('Deleting all promotions');
    });
    */

promoRouter.route('/:promoId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.dishId, function (err, promotion) {
            if (err) {
                throw err;
            }
            res.json(promotion);
        });
    })
    /*
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function(req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
    })
    */
    .put(function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err) {
                throw err;
            }
            res.json(promotion);
        });
    })
    /*
    .put(function(req, res, next) {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })
    */
    .delete(function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {
            if (err) {
                throw err;
            }
            res.json(resp);
        });
    });
    /*
    .delete(function(req, res, next) {
        res.end('Deleting promotion: ' + req.params.promoId);
    });
    */

module.exports = promoRouter;