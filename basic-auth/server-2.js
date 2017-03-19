var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 8081;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
    .all(function(req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    });


app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});