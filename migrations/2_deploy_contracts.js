const fs = require('fs');
const path = require('path');
const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
    const contractsPath = path.join(__dirname, '..', 'client', 'src', 'contracts');
    deployer.deploy(Voting).then(async (instance) => {
        fs.mkdirSync(contractsPath, { recursive: true });
        fs.copyFileSync(
            path.join(__dirname, '..', 'build', 'contracts', 'Voting.json'),
            path.join(contractsPath, 'Voting.json')
        );
    });
}
