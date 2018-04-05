'use strict';

var express = require('express');
var router = express.Router();
const request = require("request")

const apiKey = "UfiDeVoMiyo8Hq40zMxPBQrdpcsOc3_W9KrC3VJjgmkSiz6ObDOI0vMstwH1d1cSbhYGFNg_qIQo1KA8HmmM9YBf3fyK0ChAyYi4JQzZAuKZCYCUJrzmESVA2LvCWnYx";
const yelp = require('yelp-fusion');
const client = yelp.client(apiKey);

function yelpreviews(yelpid,res){

  if(yelpid==undefined){
    res.send("");
  }

  client.reviews(yelpid).then(response => {
    res.send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log(req.query);


  client.businessMatch('lookup', {
    name: req.query.name.substring(0,64),
    city: req.query.city.substring(0,64),
    state: req.query.state.substring(0,64),
    country: req.query.country.substring(0,64),
    address1: req.query.address1.substring(0,64),
    latitude: req.query.latitude,
    longitude: req.query.longitude,
  }).then(response => {
    if(response.jsonBody.businesses.length==0){
      res.send("");
    }
    yelpreviews(response.jsonBody.businesses[0].id,res);
  }).catch(e => {
    console.log(e);
  });

});

module.exports = router;
