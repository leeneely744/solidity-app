pragma solidity ^0.8.0;

contract Candidate {
    string[] public candidates;

    function add(string memory name) public {
        candidates.push(name);
    }

    function get() public view returns (string[] memory) {
        return candidates;
    }

    function count() public view returns (uint256) {
        return candidates.length;
    }
}
