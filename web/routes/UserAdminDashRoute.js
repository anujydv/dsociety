const express = require('express');
const route = express.Router();
const { auth } = require('./utils/auth');
const axios = require('axios');
function mapToObj(inputMap) {
    let obj = {};
    inputMap.forEach(function (value, key) {
        obj[key] = value
    });
    return obj;
}

route.get('/', auth, async (req, res) => {
    res.render('UserAdminDash/index', {
        title: "Dashboard"
    });
});
route.get('/addMember', auth, async (req, res) => {
    res.render('UserAdminDash/add_member', {
        title: "Dashboard"
    });
});
route.post('/add', auth, async (req, res) => {
    try {        
        let formData = JSON.parse(req.body.aadhaarData);        
        var rand = Math.floor(100 + Math.random() * 900).toString();
        var dater = new Date().getMilliseconds().toString();
        var split_date = formData.aadhaaar.dob.split('/')
        var date = new Date(Date.parse(split_date[2] + "-" + split_date[1] + "-" + split_date[0]));
        var id = rand + dater;        
        let red = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`);        
        await axios.post('http://localhost:3000/api/org.dsociety.rstate.participant.Person',
            {
                "$class": "org.dsociety.rstate.participant.Person",
                "userID": id,
                "detail": {
                    "$class": "org.dsociety.rstate.participant.UserData",
                    "name": formData.aadhaaar.name,
                    "dob": date.toISOString()
                },
                "aadhaarDetail": {
                    "$class": "org.dsociety.rstate.participant.Aadhaar",
                    "aadhaarNo": formData.aadhaaar.addharnumber,
                    "status": true,
                    "data": ""
                },
            });
        red.data.familyDetails.push({            
            "userID": id,            
            "type": req.body['typeMember']
        });
        delete red.data.userID;        
        let d = await axios.put(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`, { ...red.data });        
        res.redirect('listFamily');
        // res.render('UserAdminDash/list_family');
    } catch (error) {
        console.log(error);
    }
});

// route.get('/landDetail/${id}', auth, async (req, res) => {

//     res.render('UserAdminDash/land_detail', {
//         title: "Dashboard"
//     });
// });
route.get('/listAssets', auth, async (req, res) => {
    try {
        let red = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`,{            
        headers: {
                'Accept': 'application/json'
            }
        });        
        // console.log(red);
        let arr = [];                
        for (i = 0; i < red.data.ownership.length; i++) {
            let l = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.land.Land/${red.data.ownership[i].split('#')[1]}`);
            arr.push(l.data);
        }
        // res.json({red});
        res.render('UserAdminDash/list_assets', { data: arr });
    } catch (error) {
        res.json(error);
    }

});
route.get('/listFamily', auth, async (req, res) => {
    try {
        console.log(req.session.status);
        let red = await axios.get(`http://localhost:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`);        
        // console.log(red);
        // res.json(red);
        res.render('UserAdminDash/list_family', { data: red.data });
    } catch (error) {
        res.json(error);
    }
});

module.exports = route;