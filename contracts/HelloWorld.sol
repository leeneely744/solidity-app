pragma solidity ^0.8.0;

contract HelloWorld {
    string public name = "World";

    constructor(string memory _name) {
        name = _name;
    }

    function hello() public view returns (string memory) {
        return string(abi.encodePacked("Hello ", name));
    }
}