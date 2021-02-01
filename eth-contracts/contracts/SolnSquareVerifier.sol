pragma solidity >=0.4.21 <0.6.0;

import "../../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract MyVarifier is Verifier
{}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token
{
    MyVarifier myVarifier;

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
    mapping (bytes32 => Solution) uniqueSolutionsMap;
    mapping (address => Solution) solutionsMap;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address indexed submitterAddress);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory input) private  
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolutionsMap[key].submitterAddress == address(0), "Solution already exist");
        bool isValid = myVarifier.verifyTx(a, b, c, input);
        require(isValid = true, "Invalid solution");
        
        Solution memory solution = Solution({
            index: key,
            submitterAddress: msg.sender,
            tokenAdded: false
        });
        solutions.push(solution);
        uniqueSolutionsMap[key] = solution;
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
        mint(to, tokenId);
        solutionsMap[to].tokenAdded = true;
        return true;
    }

}















  


























