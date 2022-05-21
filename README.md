# Implementation of TransparentUpgradeableProxy using Hardhat and Ethers

This project demonstrates TUP. the contracts directory contain all the contracts we would require.
We will go step by step:
1. Deploy ImplementationV1 Contract
2. Deploy ProxyAdmin Contract
3. Deploy TUP
4. Deploy ImplementationV2 Contract
5. Upgrade our Proxy to ImplementaionV2

Before you try to run, Make sure you setup .env file with the following data
```
API_KEY = "Your Infura/Alchemy API KEY " # I have set this projectt up for Kovan Testnet
PRIVATE_KEY = "Private Key of your Wallet"
ETHERSCAN_API ="Your etherscan API key"
```

How to run:
1. ```hardhat compile```
2. ```npx hardhat run scripts/deploy.js --network kovan``` (change network as per your usecase)
3. verify your proxy as ```npx hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS --netowk kovan```  
   make sure store all the original constructor arguments in arguments.js
4. verify you implementation ```npx hardhat verify DEPLOYED_CONTRACT_ADDRESS```


