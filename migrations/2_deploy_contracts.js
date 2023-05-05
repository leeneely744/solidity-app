const fs = require('fs');
const path = require('path');
const HelloWorld = artifacts.require("HelloWorld");

module.exports = function(deployer) {
    deployer.deploy(HelloWorld, "Lee").then(() => {
        const contractsPath = path.join(__dirname, '..', 'client', 'src', 'contracts');
        fs.mkdirSync(contractsPath, { recursive: true });

        fs.copyFileSync(
            path.join(__dirname, '..', 'build', 'contracts', 'HelloWorld.json'),
            path.join(contractsPath, 'HelloWorld.json')
        );
    });
}
