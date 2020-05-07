let bn = require('composer-client').BusinessNetworkConnection;
let ac = require('composer-admin').AdminConnection;
let client  = require('composer-client').TransactionRegistry;
const connection = new bn();
let adminConnection = new ac();
function mapToObj(inputMap) {
  let obj = {};
  inputMap.forEach(function (value, key) {
    obj[key] = value
  });
  return obj;
}
async function registery(){
  await adminConnection.connect('admin@dsociety');
  // console.log(await adminConnection.exportCard('admin@dsociety'));
  console.log(mapToObj(await adminConnection.getAllCards()).toString());
  // let businessNetworks = await adminConnection.list();
  // businessNetworks.forEach((businessNetwork) => {
  //   console.log('Deployed business network', businessNetwork);
  // });
  // await connection.connect('admin@dsociety');
  // connec
  // const assetRegistries = await connection.getAllAssetRegistries();
  // console.log(await connection.getCard())
}

registery()