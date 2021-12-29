const SimpleAuction = artifacts.require("SimpleAuction");

module.exports = async function(_deployer, network, accounts) {
  // Use deployer to state migration tasks.
  _deployer.deploy(SimpleAuction, 60*60*24, accounts[2]);
};
