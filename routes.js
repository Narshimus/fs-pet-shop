const fs = require('fs');
const FILE_PATH = './pets.json'
let petData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));


routes = {
  '/pets': function(req, res) {
    let request = (req.url).split('/');
    console.log(req.url.match());
    if (request.length === 2) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(petData));
    } else if (request[2] >= 0 && request[2] < petData.length) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(petData[request[2]]));
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end("Not Found");
    }
  }
};

module.exports = routes;
