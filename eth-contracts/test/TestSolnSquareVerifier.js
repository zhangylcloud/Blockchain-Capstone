let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let proof = require('../../zokrates/code/square/proof.json');

contract("Test SolnSquareVerifier", (accounts) =>{
    let contractInstance;
    beforeEach(async function () {
        contractInstance = await SolnSquareVerifier.new("TestTokenName", "TestTokenSymbol", {from: accounts[0]});
    });

    describe('Test verification', () => {
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Test add new solution', async () => {
            let a = proof.proof.a;
            let b = proof.proof.b;
            let c = proof.proof.c;
            let inputs = proof.inputs;
            let result = await contractInstance.addSolution(a, b, c, inputs, {from: accounts[1]});
            assert.equal(result.logs[1].event, "SolutionAdded", "SolutionAdded event not emitted");
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('test mint with solution', async () => {
            let a = proof.proof.a;
            let b = proof.proof.b;
            let c = proof.proof.c;
            let inputs = proof.inputs;
            await contractInstance.addSolution(a, b, c, inputs, {from: accounts[1]});
            await contractInstance.mintWithSolution(accounts[1], 1, {from: accounts[1]});
            let tokenCount = await contractInstance.totalSupply.call();
            assert.equal(tokenCount.toNumber(), 1, "Token count should be 1");
        });
    });
});


    


