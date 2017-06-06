const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

const morgan = require('morgan');
app.use(morgan('short'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//post

app.post('/pets', (req, res) => {
  const pet = req.body;
  //validate pet object
  if (!pet || !pet['name'] || !pet['kind'] || !Number.isInteger(pet['age']) ) {
    return res.sendStatus(400);
  }
  //read pets.JSON, parse, and assign to petList
  let petList = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
  //push new pet object to petList array and write to pets.JSON
  petList.push(pet);
  fs.writeFileSync(petsPath,JSON.stringify(petList));
  res.send(pet);
})

//get requests

app.get('/pets', (req,res) =>{
  let petList = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
  res.send(petList);
})

app.get('/pets/:index', (req, res) => {
  const index = Number.parseInt(req.params.index);
  const petList = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
  if (petList[index]) {
    res.send(petList[index]);
  } else {
    return res.sendStatus(404);
  }
})

//patch

app.patch('/pets/:index', (req, res) => {
  //assign index and petList
  const index = Number.parseInt(req.params.index);
  let petList = JSON.parse(fs.readFileSync(petsPath, 'utf8'));
  //validate request
  if (!petList[index]) {
    return res.sendStatus(404);
  }
  const pet = req.body;
  if (!pet) {
    return res.sendStatus(400);
  }
  //for loop to iterate through keys in req.body and update petList
  Object.keys(pet).forEach((i)=>{
    petList[index][i] = pet[i];
  })
  fs.writeFileSync(petsPath,JSON.stringify(petList));
  res.send(petList[index]);
})

//delete

app.delete('/pets/:index', (req, res) => {
  //assign index and petList
  const index = Number.parseInt(req.params.index);
  let petList = JSON.parse(fs.readFileSync(petsPath,'utf8'));
  //validate index exists
  if (!petList[index]) {
    return res.sendStatus(404);
  }
  //splice changes petList and returns deleted pet obj
  const deletedPet = petList.splice(index,1)[0];
  fs.writeFileSync(petsPath,JSON.stringify(petList));
  res.send(deletedPet);
})

//404 catch

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(app.get('port'), () => {
  console.log('Listening on', app.get('port'));
});

module.exports = app;
