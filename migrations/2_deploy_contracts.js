const fs = require('fs');
const path = require('path');
const HelloWorld = artifacts.require("HelloWorld");
const Candidate = artifacts.require("Candidate");

module.exports = function(deployer) {
    const contractsPath = path.join(__dirname, '..', 'client', 'src', 'contracts');
    deployer.deploy(HelloWorld, "Lee").then(() => {
        fs.mkdirSync(contractsPath, { recursive: true });

        fs.copyFileSync(
            path.join(__dirname, '..', 'build', 'contracts', 'HelloWorld.json'),
            path.join(contractsPath, 'HelloWorld.json')
        );
    });

    deployer.deploy(Candidate).then(async (instance) => {
        // test data
        // 開発時のみコメントアウトを外して実行する
        // await instance.add("Alice");
        // await instance.add("Bob");
        // await instance.add("Charlie");

        fs.mkdirSync(contractsPath, { recursive: true });
        fs.copyFileSync(
            path.join(__dirname, '..', 'build', 'contracts', 'Candidate.json'),
            path.join(contractsPath, 'Candidate.json')
        );
    });
}
