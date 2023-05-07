pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Solidityではマッピングのサイズを取得することはできないので、
    // 予め数を保存しておく必要がある
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        candidates[_candidateId].voteCount++;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory _candidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            _candidates[i - 1] = candidates[i];
        }
        return _candidates;
    }

    constructor() {
        addCandidate("Sano");
        addCandidate("Takahashi");
        addCandidate("Ueno");
    }
}
