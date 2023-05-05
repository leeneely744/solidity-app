import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HelloWorld from './contracts/HelloWorld.json';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      // create web3 instance
      // http://localhost:7545 はGanacheのデフォルトのURL
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      setWeb3(web3);

      // get accounts
      const fetchedAccounts  = await web3.eth.getAccounts();
      setAccounts(fetchedAccounts );

      // create instance of HelloWorld contract
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HelloWorld.networks[networkId];
      const instance = new web3.eth.Contract(
        HelloWorld.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
    };

    if (!web3) {
      init();
    }
  }, [web3]);

  // ここにアプリのロジックやUIを追加する

  return (
    <div className='App'>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default App;
