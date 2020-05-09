const express = require('express');
const route = express.Router();
const { auth } = require('./utils/auth');
const axios = require('axios');
const Email = require("../src/model/email");
require("dotenv").config();

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
        let red = await axios.get(`${process.env.URL}/api/Person/${req.session.status}`);
        await axios.post(`${process.env.URL}/api/Person`,
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
        let d = await axios.put(`${process.env.URL}/api/Person/${req.session.status}`, { ...red.data });
        await Email.findOneAndUpdate(
            { aadhaarno: formData.aadhaaar.addharnumber },
            { $set: { level: id } }
        );
        res.redirect('listFamily');        
    } catch (error) {
        console.log(error);
    }
});

route.get('/listAssets', auth, async (req, res) => {
    try {
        let red = await axios.get(`${process.env.URL}/api/Person/${req.session.status}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const arr = [];
        if (red.data.ownership) {
            for (i = 0; i < red.data.ownership.length; i++) {
                let l = await axios.get(`${process.env.URL}/api/Land/${red.data.ownership[i].split('#')[1]}`);
                arr.push(l.data);
            }
        }
        res.render('UserAdminDash/list_assets', { data: arr });
    } catch (error) {
        res.json(error);
    }

});
route.get('/listFamily', auth, async (req, res) => {
    try {
        const family_members = [];
        const types = []        
        let red = await axios.get(`${process.env.URL}/api/Person/${req.session.status}`);        
        for (let i = 0; i < red.data.familyDetails.length; i++) {
            const details = await axios.get(
                `${process.env.URL}/api/Person/${red.data.familyDetails[i].userID}`
            );            
            family_members.push(details.data);
            types.push(red.data.familyDetails[i].type);
        }        
        res.render('UserAdminDash/list_family', { data: family_members, types: types });
    } catch (error) {
        res.json(error);
    }
});

module.exports = route;