const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddharSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    addharnumber: {
        type: String,
        require:true
    },
    phonenumber: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    eleid:{
        type:String,
        required:true
    },
    waterid:{
        type:String,
        required:true
    },
    bankid:{
        type:String,
        required:true
    }


});

const Addhar = mongoose.model('addhar', AddharSchema);
module.exports = Addhar;