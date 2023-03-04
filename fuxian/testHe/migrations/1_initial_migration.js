const Migrations = artifacts.require("Migrations");
const InfoContract = artifacts.require("InfoContract");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(InfoContract);
};