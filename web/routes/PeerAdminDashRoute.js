var express = require('express');
var router = express.Router();
var axios=require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('PeerAdminDash/index');
});
router.get('/land_registration', function (req, res) {
  res.render('PeerAdminDash/land_registration');
});
router.post('/land_registration',async function (req, res) {
  var rand = Math.floor(100 + Math.random() * 900).toString();
  var dater = new Date().getMilliseconds().toString();
  var id = rand + dater;
  console.log(req.body);
  var data={
    "$class": "org.dsociety.rstate.land.Land",
    "landTag": id,
    "address": req.body.address,
    "state": req.body.state,
    "city": req.body.city,
    "town_locality": req.body.locality,
    "district": req.body.district,
    "postOffice": req.body.postOffice,
    "pincode": req.body.pincode,
    "roadWidth": req.body.roadWidth,
    "landWidth": req.body.landWidth,
    "landHeight": req.body.landHeight,
    "gpsCoordinates": [323, 323],
    "type": "RURAL",
    "belongs": "STATEAUTHORITY"
  }
  // console.log(data);
  
  await axios.post('http://148.100.245.141:3000/api/org.dsociety.rstate.land.Land', {
    "$class": "org.dsociety.rstate.land.Land",
    "landTag": id,
    "address": req.body.address,
    "state": req.body.state,
    "city": req.body.city,
    "town_locality": req.body.locality,
    "district": req.body.district,
    "postOffice": req.body.postOffice,
    "pincode": req.body.pincode,
    "roadWidth": req.body.roadWidth,
    "landWidth": req.body.landWidth,
    "landHeight": req.body.landHeight,
    "gpsCoordinates": [323, 323],
    "type": "RURAL",
    "belongs": "STATEAUTHORITY"
  }
    

  )
    .then(function (response) {
      console.log(response.data);
      console.log("successfsdvsdscle");
      
      res.redirect('/peer/land_registration');
    })
    .catch(function (error) {
      console.log("errorzzdfzdfczfc");
      
      console.log(error.response);
    });
  
});

router.get('/land_transfer', function (req, res, next) {
  res.render('PeerAdminDash/land_transfer');
});
router.get('/search', function (req, res, next) {
  
  res.render('PeerAdminDash/search');
});
router.get('/land_updation', function (req, res, next) {
  res.render('PeerAdminDash/land_updation');
});
module.exports = router;