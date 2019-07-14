const express = require('express');
const route = express.Router();
const {auth} = require('./utils/auth');

// route.get('/', (req, res) => {
//     res.render('common/signup', {
//         title: "Login"
//     });
// });
route.get('/dashboard', auth ,async (req, res) => {
    res.render('UserAdminDash/index', {
        title: "Dashboard"
    });
});
route.get('/addMember', auth ,async (req, res) => {
    res.render('UserAdminDash/add_member',{
        title: "Dashboard"
    });
});
route.get('/landDetail', auth ,async (req, res) => {
    res.render('UserAdminDash/land_detail', {
        title: "Dashboard"
    });
});
route.get('/listAssets', auth ,async (req, res) => {
    res.render('UserAdminDash/list_assets', {
        title: "Dashboard"
    });
});
route.get('/listFamily', auth ,async (req, res) => {
    res.render('UserAdminDash/list_family', {
        title: "Dashboard"
    });
});

module.exports = route;