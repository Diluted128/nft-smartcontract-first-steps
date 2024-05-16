// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract CuteFruits is ERC721URIStorage, Ownable {
    uint256 public constant MAX_FRUITS = 8;
    uint256 public constant fruitPrice = 80000000000000; //0.00008 ETH
    string private constant fruitBaseUrl = "ipfs://QmXZ6BML982e6xqCv7ywhKREwsgBjiiuRtaLxgy5rTX6Ky/";
    uint256 private _tokenIdCounter; // nft's counter

    constructor() ERC721("CuteFruits",  "CFU") Ownable(msg.sender){}

    // There is no way to set new baseUri because super class method is marked as view
    // That's why base url is constant
    function _baseURI() internal pure override returns (string memory) {
        return fruitBaseUrl;
    }

    // WRITE Functions
    function mintFruit(uint numberOfTokens) public payable {
        require((_tokenIdCounter + numberOfTokens) <= MAX_FRUITS, "Purchase would exceed max supply of fruits");
        require((fruitPrice * numberOfTokens) <= msg.value, "Ether value sent is not correct");
        for (uint i = 0; i < numberOfTokens; i++) {
            if (totalSupply() < MAX_FRUITS) {
                uint256 newTokenId = _tokenIdCounter + 1;
                _safeMint(msg.sender, newTokenId);
                _tokenIdCounter = newTokenId;
                _setTokenURI(newTokenId, Strings.toString(newTokenId));
            }
        }
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        address payable owner = payable(owner());
        owner.transfer(balance);
    }
}
