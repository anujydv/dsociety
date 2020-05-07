var express = require('express');
var router = express.Router();
var axios = require('axios');
const { auth } = require('./utils/auth');

/* GET home page. */

router.get('/land_registration', auth, function (req, res) {
  var arr = []
  res.render('PeerAdminDash/land_registration', {
    arr: arr, address: "",
    roadWidth: 0,
    state: "",
    landHeight: 0,
    city: "",
    locality: "",
    postOffice: "",
    pincode: 0,
    district: "",
    landWidth: 0,
    type: "Urban"

  });
});
router.get('/', auth, async (req, res) => {
  res.render('PeerAdminDash/index');
});

router.get('/person_registration', auth, async (req, res) => {
  res.render('PeerAdminDash/person_registration');

});
router.post('/person_registration', auth, async (req, res) => {
  try {
    var qwerty = JSON.parse(req.body.aadhhar);
    var rand = Math.floor(100 + Math.random() * 900).toString();
    var dater = new Date().getMilliseconds().toString();
    var id = rand + dater;
    await axios.post('http://localhost:3000/api/org.dsociety.rstate.participant.Person',
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
      });
    res.redirect('/peer/person_registration');
  } catch (e) {
    console.log("errorofperson");

    console.error(e);
  };


});


router.post('/land_registration', auth, async (req, res) => {
  var rand = Math.floor(100 + Math.random() * 900).toString();
  var dater = new Date().getMilliseconds().toString();
  var id = rand + dater;
  var arr = [];

  console.log(req.body.address)
  if (req.body.address == "") {
    arr.push({ message: "Address can't be blank" });

  }
  // if (/^[a-zA-Z0-9\s,.'-]+$/.test(req.body.address)) {
  //   arr.push({ message: "Enter the valid address." })
  // }
  if (!/[a-zA-Z][a-zA-Z] */.test(req.body.state)) {
    arr.push({ message: "Enter state as alphabets." })
  }
  if (!/[a-zA-Z][a-zA-Z] */.test(req.body.city)) {
    arr.push({ message: "Enter city as alphabets." })
  }
  if (!/[a-zA-Z][a-zA-Z] */.test(req.body.locality)) {
    arr.push({ message: "Enter town locality as alphabets." })
  } if (!/[a-zA-Z][a-zA-Z] */.test(req.body.postOffice)) {
    arr.push({ message: "Enter postoffice as alphabets." })
  } if (!/[a-zA-Z][a-zA-Z] */.test(req.body.district)) {
    arr.push({ message: "Enter district as alphabets." })
  }
  if (!/[1-9]/g.test(req.body.roadWidth)) {
    arr.push({ message: "Enter road width as numbers." })
  }
  if (!/[1-9]/g.test(req.body.landWidth)) {
    arr.push({ message: "Enter land width as numbers." })
  }
  if (!/[1-9]/g.test(req.body.landHeight)) {
    arr.push({ message: "Enter land height as numbers." })
  }
  if (!/[1-9]/g.test(req.body.pincode)) {
    arr.push({ message: "Enter pincode as numbers." })
  }


  if (arr.length > 0) {
    res.render('PeerAdminDash/land_registration', {
      arr: arr,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      locality: req.body.locality,
      district: req.body.district,
      postOffice: req.body.postOffice,
      pincode: req.body.pincode,
      roadWidth: req.body.roadWidth,
      landWidth: req.body.landWidth,
      landHeight: req.body.landHeight,
      type: req.body.type

    });

  } else {

    
    await axios.post('http://localhost:3000/api/org.dsociety.rstate.land.Land', {
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
    }).then(function (response) {
      console.log(response.data);
      console.log("successofland");

      res.redirect('/peer/land_registration');
    })
      .catch(function (error) {
        console.log("errorofland");

        console.log(error.response);
      });
  }
});
router.get('/ownership', auth, (req, res) => {
  res.render('PeerAdminDash/ownershipagreement', { status: false });
});

router.post('/ownership', auth, async (req, res) => {
  try {
    let personid = req.body.personid;
    let landid = req.body.landid;
    let persondata = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${personid}`);
    let landdata = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.land.Land/${landid}`);
    let landOwnership = {
      ...landdata.data,
      "$class": "org.dsociety.rstate.land.LandOwnerShip",
      "owner": `resource:org.dsociety.rstate.participant.Person#${personid}`,
      "OriginalDocuments": true,
      "DocumentVerifiedStatus": true,
      "ScanDocumentPath": "Verified",
    }

    if (!persondata.data.ownership) {
      persondata.data.ownership = [`resource:org.dsociety.rstate.land.Land#${landid}`]
    } else {
      persondata.data.ownership.push(`resource:org.dsociety.rstate.land.Land#${landid}`);
    }
    console.log(persondata.data);
    console.log(landOwnership);
    delete persondata.data.userID;
    await axios.put(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${personid}`, { ...persondata.data });
    await axios.post(`http://localhost:3000/api/org.dsociety.rstate.land.LandOwnerShip/`, { ...landOwnership });
    // let ownershipagreement = {
    //   "$class": "org.dsociety.rstate.tarnsition.OwnerShipAgreement",
    //   "Owner": `resource:org.dsociety.rstate.participant.Person#${personid}`,
    //   "detail": `resource:org.dsociety.rstate.land.LandOwnerShip#${landid}`,
    //   "EstimatedPrice": 12.3
    // }
    // await axios.post(`http://localhost:3000/api/org.dsociety.rstate.tarnsition.OwnerShipAgreement/`, { ...ownershipagreement });
    res.redirect('/peer/ownership');
  } catch (error) {
    res.json(error);
  }
});

router.get('/saleagreement', auth, async (req, res) => {
  res.render('PeerAdminDash/saleagreement', { status: false });
});
router.post('/saleagreement', auth, async (req, res) => {
  try {
    let seller = req.body.person1id;
    let buyer = req.body.person2id;
    let landid = req.body.landid;
    let sellerdata = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${seller}`);
    let buyerdata = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${buyer}`);
    let landdata = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.land.Land/${landid}`);    
    arr = sellerdata.data.ownership;
    sellerdata.data.ownership = sellerdata.data.ownership = array.filter(function (value, index, arr) {
      return value != `resource:org.dsociety.rstate.land.Land#${landid}`;
    });        
    if (!buyerdata.data.ownership){
      buyerdata.data.ownership = [`resource:org.dsociety.rstate.land.Land#${landid}`]
    }else{
      buyerdata.data.ownership.push(`resource:org.dsociety.rstate.land.Land#${landid}`);;
    }
    let landOwnership = {
      ...landdata.data,
      "$class": "org.dsociety.rstate.land.LandOwnerShip",
      "owner": `resource:org.dsociety.rstate.participant.Person#${personid}`,
      "OriginalDocuments": true,
      "DocumentVerifiedStatus": true,
      "ScanDocumentPath": "Verified",
    }
    delete sellerdata.data.userID;
    delete buyerdata.data.userID;
    await axios.put(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${seller}`,{...sellerdata});
    await axios.put(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${buyer}`,{...buyerdata});
    await axios.post(`http://localhost:3000/api/org.dsociety.rstate.land.LandOwnerShip/`, { ...landOwnership });
    res.redirect('/saleagreement');
  } catch (error) {
    res.json(error);
  }
});

// router.get('/landupdation',(req,res)=>{
//   var arr=[];
//   res.render('PeerAdminDash/landupdation',{arr:arr,
//     address: "",
//     roadWidth: 0,
//     state: "",
//     landHeight: 0,
//     city: "",
//     locality: "",
//     postOffice: "",
//     pincode: 0,
//     district: "",
//     landWidth: 0,
//     type: "Urban"
// });

// });
// router.post('/landupdation',(req,res)=>{
//     res.json(req.body)
// });

module.exports = router;

// var data = {
  //   "$class": "org.dsociety.rstate.participant.Person",
  //   "userID": id,
  //   "detail": {
  //     "$class": "org.dsociety.rstate.participant.UserData",
  //     "name": qwerty.aadhaaar.name,
  //     "dob": qwerty.aadhaaar.dob
  //   },
  //   "aadhaarDetail": {
  //     "$class": "org.dsociety.rstate.participant.Aadhaar",
  //     "aadhaarNo": qwerty.aadhaaar.addharnumber,
  //     "status": true,
  //     "data": ""
  //   },
  //   "familyDetails": [
  //     {
  //       "$class": "org.dsociety.rstate.participant.FamilyTree",
  //       "detail": {
  //         "$class": "org.dsociety.rstate.participant.UserData",
  //         "name": "",
  //         "dob": ""
  //       },
  //       "aadhaarDetail": {
  //         "$class": "org.dsociety.rstate.participant.Aadhaar",
  //         "aadhaarNo": "",
  //         "status": false,
  //         "data": ""
  //       },
  //       "type": ""
  //     }
  //   ],
  //   "ownership": [
  //     "resource:org.dsociety.rstate.land.Land#5592"
  //   ]
  // }
  // console.log({
  //   "$class": "org.dsociety.rstate.participant.Person",
  //   "userID": id,
  //   "detail": {
  //     "$class": "org.dsociety.rstate.participant.UserData",
  //     "name": qwerty.aadhaaar.name,
  //     "dob": qwerty.aadhaaar.dob
  //   },
  //   "aadhaarDetail": {
  //     "$class": "org.dsociety.rstate.participant.Aadhaar",
  //     "aadhaarNo": qwerty.aadhaaar.addharnumber,
  //     "status": true,
  //     "data": ""
  //   },
  // });