const express = require('express');
const route = express.Router();

route.get('/addParticipant/',(req,res)=>{
    res.render('NetworkAdminDash/participantManager/addParticipant');
});
module.exports = route;