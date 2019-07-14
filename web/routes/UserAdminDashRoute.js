const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('common/signup', {
        title: "Login"
    });
});
route.get('/dashboard', (req, res) => {
    res.render('UserAdminDash/index', {
        title: "Dashboard"
    });
});
route.get('/addMember', (req, res) => {
    res.render('UserAdminDash/add_member',{
        title: "Dashboard"
    });
});
route.get('/landDetail', (req, res) => {
    res.render('UserAdminDash/land_detail', {
        title: "Dashboard"
    });
});
route.get('/listAssets', (req, res) => {
    res.render('UserAdminDash/list_assets', {
        title: "Dashboard"
    });
});
route.get('/listFamily', (req, res) => {
    res.render('UserAdminDash/list_family', {
        title: "Dashboard"
    });
});

module.exports = route;