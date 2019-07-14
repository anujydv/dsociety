var express = require('express');
var router = express.Router();
var axios=require('axios');
const auth = require('./utils/auth');

/* GET home page. */
router.get('/', auth, async(req, res) =>{
  res.render('PeerAdminDash/index');
});
router.get('/land_registration', auth,async (req, res)=> {
  let arr = [];
  res.render('PeerAdminDash/land_registration',{arr});
});
router.get('/person_registration',auth,async (req, res)=> {        
  res.render('PeerAdminDash/person_registration');
  
});
router.post('/person_registration',async (req,res)=>{
  res.json(req.body);
  var qwerty = JSON.parse(req.body.aadhhar);
  console.log(qwerty.aadhaaar.name);
  
  // console.log(JSON.parse(req.body.aadhar));
  
  var rand = Math.floor(100 + Math.random() * 900).toString();
  var dater = new Date().getMilliseconds().toString();
  var id = rand + dater;

  var data = {
    "$class": "org.dsociety.rstate.participant.Person",
    "userID": id,
    "detail": {
      "$class": "org.dsociety.rstate.participant.UserData",
      "name": qwerty.aadhaaar.name,
      "dob": qwerty.aadhaaar.dob
    },
    "aadhaarDetail": {
      "$class": "org.dsociety.rstate.participant.Aadhaar",
      "aadhaarNo": qwerty.aadhaaar.addharnumber,
      "status": true,
      "data": ""
    },
    "familyDetails": [
      {
        "$class": "org.dsociety.rstate.participant.FamilyTree",
        "detail": {
          "$class": "org.dsociety.rstate.participant.UserData",
          "name": "",
          "dob": ""
        },
        "aadhaarDetail": {
          "$class": "org.dsociety.rstate.participant.Aadhaar",
          "aadhaarNo": "",
          "status": false,
          "data": ""
        },
        "type": ""
      }
    ],
    "ownership": [
      "resource:org.dsociety.rstate.land.Land#5592"
    ]
  }
  console.log({
    "$class": "org.dsociety.rstate.participant.Person",
    "userID": id,
    "detail": {
      "$class": "org.dsociety.rstate.participant.UserData",
      "name": qwerty.aadhaaar.name,
      "dob": qwerty.aadhaaar.dob
    },
    "aadhaarDetail": {
      "$class": "org.dsociety.rstate.participant.Aadhaar",
      "aadhaarNo": qwerty.aadhaaar.addharnumber,
      "status": true,
      "data": ""
    },
  });
  await axios.post('http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person',
    {
      "$class": "org.dsociety.rstate.participant.Person",
      "userID": id,
      "detail": {
        "$class": "org.dsociety.rstate.participant.UserData",
        "name": qwerty.aadhaaar.name,
        "dob": qwerty.aadhaaar.dob
      },
      "aadhaarDetail": {
        "$class": "org.dsociety.rstate.participant.Aadhaar",
        "aadhaarNo": qwerty.aadhaaar.addharnumber,
        "status": true,
        "data": ""
      },      
    }).then((response)=>{
      console.log(response.data);
      console.log("successofperson");

      res.redirect('/peer/person_registration');
    }).catch(function (error) {
      console.log("errorofperson");

      console.log(error.response);
    });

  
});


router.post('/land_registration',auth,async (req, res)=> {
  var rand = Math.floor(100 + Math.random() * 900).toString();
  var dater = new Date().getMilliseconds().toString();
  var id = rand + dater;
  res.json(req.body);
  // var data={
  //   "$class": "org.dsociety.rstate.land.Land",
  //   "landTag": id,
  //   "address": req.body.address,
  //   "state": req.body.state,
  //   "city": req.body.city,
  //   "town_locality": req.body.locality,
  //   "district": req.body.district,
  //   "postOffice": req.body.postOffice,
  //   "pincode": req.body.pincode,
  //   "roadWidth": req.body.roadWidth,
  //   "landWidth": req.body.landWidth,
  //   "landHeight": req.body.landHeight,
  //   "Coordinates": JSON.parse(req.body.coordinates),
  //   "type": "RURAL",
  //   "belongs": "STATEAUTHORITY"
  // }
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
    "Coordinates": JSON.parse(req.body.coordinates),
    "type": "RURAL",
    "belongs": "STATEAUTHORITY"
  }
    

  )
    .then(function (response) {
      console.log(response.data);
      console.log("successofland");
      
      res.redirect('/peer/land_registration');
    })
    .catch(function (error) {
      console.log("errorofland");
      
      console.log(error.response);
    });
  
});
router.get('/ownership',auth,(req,res)=>{
  res.render('PeerAdminDash/ownershipagreement');
});

router.post('/ownership',auth,(req,res)=>{
  console.log(req.body);
  res.json(req.body);
  

  
});

router.get('/saleagreement',auth,async (req,res)=>{
  res.render('PeerAdminDash/saleagreement');
});
router.post('/saleagreement',auth,async (req, res) => {
  res.json(req.body);
});


router.get('/land_transfer',auth ,async (req, res )=> {
  res.render('PeerAdminDash/land_transfer');
});
router.get('/search',auth,async (req, res)=> {
  
  res.render('PeerAdminDash/search');
});
router.get('/land_updation',auth,async (req, res) =>{
  res.render('PeerAdminDash/land_updation');
});
module.exports = router;