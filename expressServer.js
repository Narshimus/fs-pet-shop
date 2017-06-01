'use strict'
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets',(req,res) => {
  let petsData = fs.readFileSync(petsPath,'utf8');
  res.set('Content-Type', 'application/json');
  res.send(petsData);
});

app.get('/pets/:index',(req, res) =>{
  let petsData = fs.readFileSync(petsPath,'utf8');
  let pets = JSON.parse(petsData);
  let index = Number.parseInt(req.params.index);
  if (pets[index]) {
    res.set('Content-Type', 'application/json');
    res.send(pets[index]);
  }
  else {
    res.sendStatus(404)
  }
})

app.use((req, res, next) => {
  res.status(404).send('Sorry about that!');
});

app.listen(port, () => {
  console.log('listening on port', port);
});

module.exports = app;
