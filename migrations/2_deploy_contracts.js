const King = artifacts.require("./King.sol");

module.exports = function (deployer) {
  deployer.deploy(King);
};
