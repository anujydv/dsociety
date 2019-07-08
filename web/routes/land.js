const express = require('express');
const axios=require('axios');
const router = express.Router();


router.get('/landdetails',(req,res)=>{
    axios.get('http://148.100.245.141:3000/api/org.dsociety.rstate.land.Land')
        .then(function (response) {
            res.json(response.data);
            // console.log(response);
            
        })
        .catch(function (error) {
            console.log(error);
        });
});


router.post('/landdetails',(req,res)=>{
    axios.post('http://148.100.245.141:3000/api/org.dsociety.rstate.land.Land', {
       
            "$class": "org.dsociety.rstate.land.Land",
            "landTag": "string3",
            "address": "string",
            "state": "string",
            "city": "string",
            "town_locality": "string",
            "district": "string",
            "postOffice": "string",
            "pincode": "string",
            "roadWidth": 0,
            "landWidth": 0,
            "landHeight": 0,
            "gpsCoordinates": [323,323],
            "type": "RURAL",
            "belongs": "STATEAUTHORITY"
        
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
})






module.exports = router;
