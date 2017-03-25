var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 8081;

var app = express();
var dishRouter = express.Router();

function auth(req, res, next) {
    console.log(req.headers);
    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user === 'admin' && pass === 'password') {
            res.cookie('user', 'admin', {signed: true});
            next(); //authorized
        } else {
            var err = new Error('You are not authenticated');
            err.status = 401;
            next(err);
        }
    } else {
        if (req.signedCookies.user === 'admin') {
            console.log(req.signedCookies);
            next();
        }
    }
}

app.use(morgan('dev'));
app.use(cookieParser('12345-67890-54321')); //secret key

dishRouter.use(bodyParser.urlencoded({ extended: true }));
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    });

app.use(auth);
app.use(express.static(__dirname + '/public'));
app.use(function(err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});