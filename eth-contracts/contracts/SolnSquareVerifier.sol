pragma solidity >=0.4.21 <0.6.0;

import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// Inherit Verifier directly to use verifyTx function
contract SolnSquareVerifier is CustomERC721Token, Verifier
{
    // TODO define a solutions struct that can hold an index & an address
    struct Solution 
    {
        bytes32 index;
        address submitterAddress;
        bool tokenAdded;
    }
    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => bool) uniqueSolutionsMap;
    mapping (address => Solution) solutionsMap;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address submitterAddress);

    constructor(string memory name, string memory symbol) 
    CustomERC721Token(name, symbol) 
    public {}

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input) public  
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(!uniqueSolutionsMap[key], "Solution already exist");
        bool isValid = verifyTx(a, b, c, input);
        require(isValid == true, "Invalid solution");
        
        Solution memory solution = Solution({
            index: key,
            submitterAddress: msg.sender,
            tokenAdded: false
        });
        solutions.push(solution);
        uniqueSolutionsMap[key] = true;
        solutionsMap[msg.sender] = solution;

        emit SolutionAdded(msg.sender);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintWithSolution(address to, uint tokenId) public returns(bool)
    {
        require(solutionsMap[to].index > 0, "Solution doesn't exist");
        require(solutionsMap[to].tokenAdded  == false, "Solution already has token");
        _mint(to, tokenId);
        solutionsMap[to].tokenAdded = true;
        return true;
    }

}















  


























