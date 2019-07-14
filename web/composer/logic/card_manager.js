const AdminConnection = require('composer-admin').AdminConnection;
const NetworkCardStoreManager = require('composer-common').NetworkCardStoreManager;

var walletType = { type: 'composer-wallet-filesystem' }
var adminConnection = new AdminConnection(walletType);
const cardStore = NetworkCardStoreManager.getCardStore(walletType);

module.exports = {
    importCard: async function (cardName,idCard) {
        try {
            let data = await adminConnection.importCard(cardName,idCard);
            return data;
        } catch (error) {
            return error
        }
    },
    exportCard: async function (cardName) {
        try {
            let data = await adminConnection.exportCard(cardName);
            return data;
        } catch (error) {
            return error
        }
    },
    listCard: async function () {
        try {
            let data = await adminConnection.getAllCards();
            return data;
        } catch (error) {
            return error;
        }
    },
    deleteCard: async function () {
        try {
            let data = await adminConnection.deleteCard(cardName);
            return data;
        } catch (error) {
            return error
        }
    }
};