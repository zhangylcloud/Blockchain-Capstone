var CustomERC721Token = artifacts.require('CustomERC721Token');
var util = require('util');

contract('TestERC721Mintable', accounts => {

    //const account0 = accounts[0];
    //const account1 = accounts[1];
    //const account2 = accounts[2];
    //const account3 = accounts[3];
    //const account4 = accounts[4];
    //const account5 = accounts[5];
    //const account6 = accounts[6];
    //const account7 = accounts[7];
    //const account8 = accounts[8];
    //const account9 = accounts[9];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Test Name", "TESTSYM", {from: accounts[0]}); //accounts[0] is contract owner
            // TODO: mint multiple tokens
            await this.contract.mint(accounts[1], 1, {from: accounts[0]});
            await this.contract.mint(accounts[2], 2, {from: accounts[0]});
            await this.contract.mint(accounts[3], 3, {from: accounts[0]});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 3, "Expect 3 token minted");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(accounts[1]);
            assert.equal(balance, 1, "Expect 1 token balance for accounts[1]]")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI is unexpected");
        })

        it('should transfer token from one owner to another', async function () { 
            let oldOwner = await this.contract.ownerOf(2);
            assert.equal(oldOwner, accounts[2], "Original owner should be accounts[2]");
            await this.contract.safeTransferFrom(accounts[2], accounts[1], 2, {from: accounts[2]});
            let newOwner = await this.contract.ownerOf(2);
            assert.equal(newOwner, accounts[1], "New owner should be accounts[1]");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new("Test Name", "TESTSYM", {from: accounts[0]});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            try{
                await this.contract.mint(accounts[1], 1, {from: accounts[1]});
            }
            catch(e){
                assert.equal(e.message.includes("Caller is not contract owner"), true, "Only contract owner can mint");
            }
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.getOwner();
            assert.equal(contractOwner, accounts[0], "contract owner should be accounts[0]");
        })

    });
})