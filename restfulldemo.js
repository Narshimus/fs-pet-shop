const express = require('express');
const app = express();

const guests = [
  {
    name: 'Teagan',
  }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

const morgan = require('morgan');
app.use(morgan('short'));

// include the body parser module
const bodyParser = require('body-parser');
// use body parser for middleware
// grab the request
// looks at the body of the request
// turns the string into parsed json
// then keep going
app.use(bodyParser.json());

// make a GET request to /guests
// send guests back, where guests is an array or a collection of guest resources
app.get('/guests', (req, res) => {
  res.send(guests);
});

// make a GET request to /guests with an index parameter (/guests/0)
app.get('/guests/:index', (req, res) => {
  // we are taking the parameter 'index' from our request
  // we are then turning that "0" into a number data type
  // "0" >> 0
  const index = Number.parseInt(req.params.index);

  // validating our request
  // checking to see if the index is NaN
  //  or it's less than 0
  //  or it's greater than the length of our guests json
  //  if it matches any of those conditions
  //  throw an error
  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    // the return here will end processing of this function
    // otherwise we could use an if-else
    return res.sendStatus(404);
  }

  // return the guests at the index parameter that was given
  res.send(guests[index]);
});

// try to create a new guest in our guest list
// recognize a POST to `/guests`
app.post('/guests', (req, res) => {
  // grab the request body (parsed by bodyParser)
  // this will include our query parameters (or form parameters)
  const guest = req.body;

  // if guest is undefined
  // user goofed
  if (!guest) {
    // send 400
    // stop processing
    return res.sendStatus(400);
  }

  // if guest exists
  // push our new guest to our guests collection
  guests.push(guest);

  // then send the guest back
  // we can send a status code explicitly
  // by default it will send 200 OK
  res.send(guest);
});

// look for a PUT request
// at route `/guests/:index` it will need an index parameter
// :index will be used to find the specific guest we want to update
app.put('/guests/:index', (req, res) => {
  // turning our string type index "0"
  // to be a number/integer 0
  // store in variable
  const index = Number.parseInt(req.params.index);

  // check to see if our index parameter input is valid
  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    // if not valid send 404 status and stop processing
    return res.sendStatus(404);
  }

  // store the parsed request body
  // in a variable called guest
  const guest = req.body;

  // if variable is undefined
  // send 400 status
  // stop processing
  if (!guest) {
    return res.sendStatus(400);
  }


  // replace the guest at guests[index]
  // with the new parsed guest javascript object
  guests[index] = guest;

  // then send the newly updated javascript object
  // as a response
  res.send(guest);
});

/*
  PUT >> find a resource and replace ENTIRELY with the new resource information
  guests[index] = guest

  PATCH >> find a resource and replace ONLY specific attributes of that resource

  // these two are the same
  guests[index].age = guest.age
  guests[index].age = req.body.age
 */

// search for a DELETE request
// at `/guests/:index` (`/guests/0`)
app.delete('/guests/:index', (req, res) => {
  // parse the "0" index string to be a 0 index number
  const index = Number.parseInt(req.params.index);

  // check to see if the index is invalid for our server
  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    // if invalid send 404 and stop processing
    return res.sendStatus(404);
  }

  // look through guest list
  // find a guest
  // remove it that guests from our guests collection
  // and return the guest that we are removing
  const removedGuestsArray = guests.splice(index, 1);
  const guest = removedGuestsArray[0];

  // send the deleted guest
  res.send(guest);
});


app.listen(app.get('port'), () => {
  console.log('Listening on', app.get('port'));
});
