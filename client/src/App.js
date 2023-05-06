import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CandidateContract from './contracts/Candidate.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [candidates, setCandidates] = useState([]);

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

      // get candidates
      // call() でメソッドを呼び出すと、ガス代を消費しない
      const candidatesCount = await contract.methods.count().call();
      const fetchedCandidates = [];
      for (let i = 0; i < candidatesCount; i++) {
        const candidate = await contract.methods.candidates(i).call();
        fetchedCandidates.push(candidate);
      }

      const shuffledCandidates = fetchedCandidates.sort(() => Math.random() - 0.5);
      setCandidates(shuffledCandidates);
    };

    loadCandidates();
  }, []);

  // ここにアプリのロジックやUIを追加する

  return (
    <div className='App'>
      <h1>Hello, World!</h1>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>{candidate}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
