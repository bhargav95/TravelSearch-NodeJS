var express = require('express');
var router = express.Router();
const request = require("request")

/* GET users listing. */
router.get('/', function(req, res, next) {
  var placeId = req.query.placeid;
  var key = "";

  request.get({url: "https://maps.googleapis.com/maps/api/place/details/json",
    qs: {placeid: placeId, key: key}}, function(err, response, body) {

    var results = JSON.parse(body);

    /*
    var output= "";

    for(var i=0;i<results.length;++i){
      output+=results[i].name+": "+results[i].vicinity+"<br>";
    }

    res.send(output);
    */
    console.log(results);
    res.send(results);
  });

});

module.exports = router;
