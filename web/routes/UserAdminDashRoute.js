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

route.get('/dashboard', auth, async (req, res) => {
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
        let formData = JSON.stringify(req.body.aadhaarData);
        let red = await axios.get(`http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`);
        await axios.post('http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person',
            {
                "$class": "org.dsociety.rstate.participant.Person",
                "userID": formData.aadhaaar.addharnumber%10000000,
                "detail": {
                    "$class": "org.dsociety.rstate.participant.UserData",
                    "name": formData.aadhaaar.name,
                    "dob": formData.aadhaaar.dob
                },
                "aadhaarDetail": {
                    "$class": "org.dsociety.rstate.participant.Aadhaar",
                    "aadhaarNo": formData.aadhaaar.addharnumber,
                    "status": true,
                    "data": ""
                },
            });
        red.data.familyDetails.push({
            "$class": "org.dsociety.rstate.participant.Person",
            "userID": formData.aadhaaar.addharnumber % 10000000,
            "detail": {
                "$class": "org.dsociety.rstate.participant.UserData",
                "name": formData.aadhaaar.name,
                "dob": formData.aadhaaar.dob
            },
            "aadhaarDetail": {
                "$class": "org.dsociety.rstate.participant.Aadhaar",
                "aadhaarNo": formData.aadhaaar.addharnumber,
                "status": true,
                "data": ""
            },
        });
        await axios.post(`http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person${req.session.status}`,red.data);
        res.redirect('/listFamily');
        res.render('UserAdminDash/list_family');
        } catch (error) {
            res.json(error);
        }
    });

// route.get('/landDetail/${id}', auth, async (req, res) => {

//     res.render('UserAdminDash/land_detail', {
//         title: "Dashboard"
//     });
// });
route.get('/listAssets', auth,async (req, res) => {
    try {
        let red = await axios.get(`http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`);
        let arr = [];
        for (i = 0; i < red.data.ownership.length; i++) {
            let l = await axios.get(`http://148.100.245.141:3000/api/org.dsociety.rstate.land.Land/${red.data.ownership[i].split('#')[1]}`);
            arr.push(l.data);
        }
        res.render('UserAdminDash/list_assets', { data: arr });
    } catch (error) {
        res.json(error);
    }

});
route.get('/listFamily',auth,async (req, res) => {
    try {
        let red = await axios.get(`http://148.100.245.141:3000/api/org.dsociety.rstate.participant.Person/${req.session.status}`);
        // res.json(red.data);
        res.render('UserAdminDash/list_family', { data: red.data });
    } catch (error) {
        res.json(error);
    }
});

module.exports = route;