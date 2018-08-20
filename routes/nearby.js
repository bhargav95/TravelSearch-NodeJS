var express = require('express');
var router = express.Router();
const request = require("request")
const delay = require('delay');



function getNextPage(token,results, res, count){



  if(count==2){
    res.send(results);
    return;
  }

  count--;

  delay(2000)
      .then(() => {
          request.get({url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            qs: {pagetoken: token, key: ""}}, function(err, response, body){

              resjson =JSON.parse(body);

              results = results.concat(resjson.results);

              getNextPage(resjson['next_page_token'],results,res, count)

            });
    });

}

function listPlaces(json1,place,res){
  request.get({url: "https://maps.googleapis.com/maps/api/geocode/json",
    qs: {address: place, key: ""}}, function(err, response, body) {

      console.log(JSON.parse(body).results[0]);


      var coord = JSON.parse(body).results[0].geometry.location;

      json1.location = coord.lat + "," + coord.lng;

      findPlaces(json1,res);
  });
}

function findPlaces(json1,res){
  json1.key = 'AIzaSyD3s6OJpYDXIgCj0EZST4oOvKjVdsL8qLc';

  console.log(json1);

  request.get({url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
    qs: json1}, function(err, response, body) {

    var resjson = JSON.parse(body)

    var results = resjson.results;

    var token = resjson['next_page_token'];

    getNextPage(token,results,res, 2);


  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  var radio = req.query.radio;
  var place = req.query.place;

  var json1 = req.query;
  delete json1.radio;
  delete json1.place;

  if(radio=='option2'){
    console.log("locash");
    console.log(place);
    listPlaces(json1,place,res);
  }
  else{
    findPlaces(json1,res);
  }

});

module.exports = router;
