const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: false,
        default: 0
    },

    org: {
        type: String,
        require: true
    }


});

const Bank = mongoose.model('bank', BankSchema);
module.exports = Bank;