const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true,
        default:"qwerty123"
    },

    aadhaarno: {
        type: String,
        require: false
    },
    card:{
        type:String,
        require:false
    },
    type:{
        type:String,
        require:true,
        default:"user"
    }



});

const Email = mongoose.model('email', EmailSchema);
module.exports = Email;