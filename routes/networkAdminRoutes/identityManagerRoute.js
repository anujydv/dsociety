const express = require('express');
const route = express.Router();

route.get('/bindIdentity/',(req,res)=>{
    res.render('NetworkAdminDash/identityManager/bindIdentity');
});
route.get('/issueIdentity/',(req,res)=>{
    res.render('NetworkAdminDash/identityManager/issueIdentity');
});
route.get('listIdentity',(req,res)=>{
    res.render('NetworkAdminDash/identityManager/listIdentity');
});
route.get('requestIdentity',(req,res)=>{
    res.render('NetworkAdminDash/identityManager/requestIdentity');
});
route.get('revokeIdentity',(req,res)=>{
    res.render('NetworkAdminDash/identityManager/revokeIdentity');
});

module.exports = route;