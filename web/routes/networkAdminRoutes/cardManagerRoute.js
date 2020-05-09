const express = require('express');
const route = express.Router();
// var network = require('../../composer/logic/card_manager');
const { auth } = require('../utils/auth');
let ac = require('composer-admin').AdminConnection;
const bn = require('composer-client').BusinessNetworkConnection;
function mapToObj(inputMap) {
    let obj = {};
    inputMap.forEach(function (value, key) {
        obj[key] = value
    });
    return obj;
}
// route.get('/importCard/', auth, async (req, res) => {
//     try {
//         // let data = network.importCard(cardName, idCard);
//         // res.json({ data });
//         res.render('NetworkAdminDash/cardManager/importCard');
//     } catch (error) {
//         res.json({ error });
//     }
// });

route.route('/exportCard/').get(auth, async (req, res) => {
    try {        
        res.render('NetworkAdminDash/cardManager/exportCard', { card_data: '', status: '' });
    } catch (error) {
        res.json({ error });
    }
}).post(auth, async (req, res) => {
    try {
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let has_result = false;
        if (req.body['card_name'].trim() !== "") {
            card_data = await adminConnection.exportCard(req.body['card_name']);
            has_result = true;
        }
        adminConnection.disconnect();
        res.render('NetworkAdminDash/cardManager/exportCard',
            {
                card_data: JSON.stringify(card_data, undefined, 2), status: has_result
            });
    } catch (error) {
        console.log(error)
    }
});
route.route('/hasCard/').get(auth, async (req, res) => {
    try {
        res.render('NetworkAdminDash/cardManager/hasCard', { status: "" });
    } catch (error) {
        res.json({ error });
    }
}).post(auth, async (req, res) => {
    try {
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let has_result = false;
        if (req.body['card_name'].trim() !== "")
            has_result = await adminConnection.hasCard(req.body['card_name']);
        adminConnection.disconnect();
        res.render('NetworkAdminDash/cardManager/hasCard', { status: has_result });
    } catch (error) {
        console.log(error)
    }
});
route.get('/listCard/', auth, async (req, res) => {
    try {
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let cardData = await adminConnection.getAllCards()
        let data = mapToObj(cardData);
        card_list = []
        for (key in data) {
            console.log(key)
            card_list.push({ "card_name": key, "user_name": data[key]["metadata"]["userName"], "org_name": data[key]["connectionProfile"]["client"]["organization"] });
        }
        adminConnection.disconnect();
        res.render('NetworkAdminDash/cardManager/listCard', { card_list: [...card_list] });
    } catch (error) {
        res.json({ error });
    }
});

route.get('/deleteCard/', auth, async (req, res) => {
    try {
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let cardData = await adminConnection.getAllCards()
        let data = mapToObj(cardData);
        card_list = []
        for (key in data) {
            card_list.push({ "card_name": key });
        }
        adminConnection.disconnect();
        res.render('NetworkAdminDash/cardManager/deleteCard', { card_list: [...card_list], status: "list" });
    } catch (error) {
        res.json({ error });
    }
});
route.post('/deleteCard/', auth, async (req, res) => {
    try {
        let card_name = req.body['card_name'];
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let cardData = await adminConnection.getAllCards()
        let data = mapToObj(cardData);
        let delete_status = false;
        card_list = []
        for (key in data) {
            if (card_name == key) {
                delete_status = await adminConnection.deleteCard(card_name);
            } else {
                card_list.push({ "card_name": key });
            }
        }
        adminConnection.disconnect();
        res.render('NetworkAdminDash/cardManager/deleteCard', { card_list: [...card_list], status: delete_status });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = route;