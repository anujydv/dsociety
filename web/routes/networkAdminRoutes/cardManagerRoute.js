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
route.get('/importCard/', auth, async (req, res) => {
    try {
        // let data = network.importCard(cardName, idCard);
        // res.json({ data });
        res.render('NetworkAdminDash/cardManager/importCard');
    } catch (error) {
        res.json({ error });
    }
});

route.get('/exportCard/', auth, async (req, res) => {
    try {
        // let data = await network.exportCard(cardName);
        // res.json({ data });
        res.render('NetworkAdminDash/cardManager/exportCard');
    } catch (error) {
        res.json({ error });
    }
});
route.route('/hasCard/').get(auth, async (req, res) => {
    try {        
        res.render('NetworkAdminDash/cardManager/hasCard');
    } catch (error) {
        res.json({ error });
    }
}).post(auth, async (req, res) => {
    try {
        // let data = await network.exportCard(cardName);
        // res.json({ data });
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let cardStatus = await adminConnection.hasCard();
        res.json({ "status": cardStatus })
        res.render('NetworkAdminDash/cardManager/hasCard');
    } catch (error) {
        res.json({ error });
    }
});
route.get('/listCard/', auth, async (req, res) => {
    try {
        let adminConnection = new ac();
        await adminConnection.connect('admin@dsociety');
        let cardData = await adminConnection.getAllCards()
        let data = mapToObj(cardData);
        res.json({ data })
        // res.render('NetworkAdminDash/cardManager/listCard');
    } catch (error) {
        res.json({ error });
    }
});

route.get('/deleteCard/', auth, async (req, res) => {
    try {
        // let data = await network.deleteCard(cardName);
        // res.json({ data });
        res.render('NetworkAdminDash/cardManager/deleteCard');
    } catch (error) {
        res.json({ error });
    }
});

module.exports = route;