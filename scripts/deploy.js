const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
  const base_uri = 'https://gateway.pinata.cloud/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/';
  const Contract = await ethers.getContractFactory('StressCapital');
  const contract = await Contract.deploy('Stress Capital', 'SCPTL', base_uri);

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);

  const address = JSON.stringify({ address: contract.address }, null, 4);
  const dir = './src/abis';

  // Buat direktori jika belum ada
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFile(path.join(dir, 'contractAddress.json'), address, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deployed contract address saved to contractAddress.json');
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
