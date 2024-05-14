// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CuteFruits is ERC721, ERC721URIStorage, Ownable {
    string private NFTsCollectionName = "CuteFruits";
    string private NFTsAcronym = "CFU";
    // nft's counter
    uint256 private _tokenIdCounter;
    // dictionary key: string, value: uint8
    mapping(string => uint8) private nftURIs;

    constructor() ERC721(NFTsCollectionName, NFTsAcronym) Ownable(msg.sender)
    {}

    function payToMint(address recipient, string memory metadataURI) public payable returns (uint256) {
        require(!isContentOwned(metadataURI), 'NFT already minted!');
        require(isPaymentProfitable(), 'Need to pay up!');
        uint256 newItemId = _tokenIdCounter;
        _tokenIdCounter += 1;
        nftURIs[metadataURI] = 1;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);
        return newItemId;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return nftURIs[uri] == 1;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function isPaymentProfitable() private view returns (bool){
        return msg.value >= 0.05 ether;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
