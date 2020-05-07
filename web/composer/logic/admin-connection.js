const AdminConnection = require('composer-admin').AdminConnection;

// Used as the card for all calls
const cardNameForPeerAdmin = "PeerAdmin@hlfv1";
const   cardNameForNetworkAdmin   = "admin@dsociety";

// 1. Create Admin Connection object for the fabric
var adminConnection = new AdminConnection();

// 2. Initiate a connection as PeerAdmin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){

    console.log("Admin Connected Successfully!!!");
    // Display the name and version of the network app
   adminConnection.list().then((data)=>{
    console.log(data)
   })
}).catch((error)=>{
    console.log(error);
});


    
function getCard(){

}


