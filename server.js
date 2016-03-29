'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
// const _ = require('lodash');

//express is (set)ting all the views with a jade termination
// without having to write it all over everytime I write the path
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get('/lookup', (req, res) => {
  res.render('index');
});
let url;
app.post('/lookup', (req, res) => {
  const lookupInput = req.body.stockinput;
  url = `http://dev.markitondemand.com/Api/v2/Lookup/json?input=${lookupInput}`
  console.log(url);
  res.send('future post request thingy');
});

app.get('/chooseStock', (req, res) => {
  url = 'http://dev.markitondemand.com/Api/v2/Lookup/json?input=ap';
  request.get(url, (err, response, html) => {
    if (err) throw err;
    let respo = JSON.parse(html);
    console.log(typeof(respo));
    respo.forEach(function(obj) {
      console.log(obj);
    });
    
    //console.log(entry);
    
    res.render('chosenStock');
  });
});

//########This is starting the browser with mongo or whatevs###########
//the one typed to browser search
const PORT = 3000;


//connecting to database
mongoose.connect('localhost:27017');

mongoose.connection.on('open', () => {
  console.log('Mongo Open!');

  //listen automatically defaults to were the server is running
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}??`)
  })
})

module.exports = app;
