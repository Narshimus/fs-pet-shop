const http = require('http');
const routes = require('./routes');
const petRegExp = /^\/pets\/?(.*)$/;


var handleRequest = function (req, res) {
  if(/^\/pets/.test(req.url)) {
    routes[(req.url.match(/^\/pets/)[0])](req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("404, no such route");
  }
};

var server = http.createServer(handleRequest);

server.listen(8000, function() {
  console.log("Listening...");
});

module.exports = server;
