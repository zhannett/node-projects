var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 8081;

var server = http.createServer(function (req, res) {
    var fileUrl;
    var filePath;
    var fileExt;
    console.log('Request for ' + req.url + ' by method ' + req.method);
    if (req.method === 'GET') {
        if (req.url === '/') {
            fileurl = '/index.html';
        } else {
            fileUrl = req.url;
        }
        filePath = path.resolve('./public' + fileUrl);
        fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.exists(filePath, function (exists) {
                "use strict";
                if (!exists) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Error 404: ' + fileUrl + ' not a HTML file</h1>');
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Error 404: ' + req.method + ' not supported</h1>');
    }
});
server.listen(port, hostname, function () {
    "use strict";
    console.log(`Server running at http://${hostname}:${port}/`);
});