const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition

const cardNameForPeerAdmin = "PeerAdmin@hlfv1";
const cardNameForNetworkAdmin = "admin@dsociety";
const appToBePinged = "dsociety";

var walletType = { type: 'composer-wallet-filesystem' }
var adminConnection = new AdminConnection(walletType);

module.exports = {
    listBusinessNetwork: async function () {
        try {
            await adminConnection.connect(cardNameForPeerAdmin);
            let networks = await adminConnection.list();
            await adminConnection.disconnect();
            return networks;
        }
        catch (error) {
            return error;
        }
    },


    pingBusinessNetwork: async function () {
        try {
            await adminConnection.connect(cardNameForNetworkAdmin);
            let response = await adminConnection.ping(appToBePinged);
            await adminConnection.disconnect();
            return response;
        }
        catch (error) {
            return {msg:"error occured"};
        };
    },

    installBusinessNetwork: async function (bnaDirectory) {
        try {
            let bnaDef = {}
            await adminConnection.connect(cardNameForPeerAdmin);
            bnaDef = await BusinessNetworkDefinition.fromDirectory(bnaDirectory);
            let response = await adminConnection.install(bnaDef);
            await adminConnection.disconnect();
            return { bnaDef, response };
        } catch (error) {
            return error;
        };
    },

    updateBusinessNetwork: async function (appName, version) {
        try {
            await adminConnection.connect(cardNameForPeerAdmin);
            let response = await adminConnection.upgrade(appName, version);
            await adminConnection.disconnect();
        } catch (error) {
            return error;
        }
    },

    startBusinessNetwork: async function (archive_name) {
        try {
            await adminConnection.connect(cardNameForNetworkAdmin);
            let businessNetworkDefinition = await BusinessNetworkDefinition.fromArchive(archive_name);
            let response = await adminConnection.start(businessNetworkDefinition,
                {
                    networkAdmins: [{ userName: 'admin', enrollmentSecret: 'adminpw' }]
                });
            return response;
        } catch (error) {
            return error;
        }
    },
    logBusinessNetwork: async function () {
        try {
            await adminConnection.connect(cardNameForNetworkAdmin);
            let currentLogLevel = await adminConnection.getLogLevel();
            await adminConnection.disconnect();
            return currentLogLevel;
        } catch (error) {
            return error;
        }
    }
}