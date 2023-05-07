import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CandidateContract from './contracts/Voting.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function loadCandidates() {
      // create web3 instance
      // http://localhost:7545 はGanacheのデフォルトのURL
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3(web3);

      // create instance of CandidateContract contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CandidateContract.networks[networkId];
      const contract = new web3.eth.Contract(
        CandidateContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(contract);

      // get all candidates
      const fetchedCandidates = await contract.methods.getAllCandidates().call();
      const copiedArr = fetchedCandidates.slice();
      const shuffledCandidates = copiedArr.sort(() => Math.random() - 0.5);
      setCandidates(shuffledCandidates);
    };

    loadCandidates();
  }, []);

  async function voteForCandidate(candidateId) {
    // 接続されているEthereumノードのアカウントを取得
    // 開発時ならGanacheで、本番環境ではMetaMaskだったりする。
    const accounts = await web3.eth.getAccounts();

    await contract.methods.vote(candidateId).send({ from: accounts[0] });
    window.location.reload();
  }

  return (
    <div className='App'>
      <h1>Vote Game!</h1>
      {candidates.map((candidate, index) => (
        <div key={index}>
          <p>{`${candidate.name}: ${candidate.voteCount} votes`}</p>
          <button onClick={() => voteForCandidate(candidate.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
};

export default App;
