// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
//var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
//
//module.exports = function(deployer) {
//  deployer.deploy(SquareVerifier);
//  deployer.deploy(SolnSquareVerifier);
//};
//var CustomERC721Token = artifacts.require("CustomERC721Token");
//
//module.exports = function(deployer) {
//  deployer.deploy(CustomERC721Token, "Test Name", "TESTSYM");
//};
var Verifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

module.exports = function(deployer) {
  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier, "Test Name", "TESTSYM");
};