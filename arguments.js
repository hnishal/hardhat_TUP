// these are the arguments we passed to proxy contracts when we deployed
module.exports = [
    "0x5b75fe81a934F30405473538Caa1915De28f8b8E", //implementationV1 address
    "0x1D80a988f6Fb82E0ee9C84089B5E5a45E033a129",  // proxyadmin address
    "0x3f7ff3a6000000000000000000000000000000000000000000000000000000000000000f" // function initializer data
]


// npx hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS --netowk kovan
// npx hardhat verify --constructor-args arguments.js 0x5a0Cd5D362534aA1Fe8C1c048d9c807E8AD2fd3b

/*
    $ npx hardhat run scripts/deploy.js --network kovan
    ImplementationV1 deployed at:  0x5b75fe81a934F30405473538Caa1915De28f8b8E
    ProxyAdmin deployed at:  0x1D80a988f6Fb82E0ee9C84089B5E5a45E033a129
    Compiled function signature :  0x3f7ff3a6000000000000000000000000000000000000000000000000000000000000000f
    Proxy deployed at:  0x5a0Cd5D362534aA1Fe8C1c048d9c807E8AD2fd3b
    Value of counter:  16
    ImplementationV1 deployed at:  0x28E80cDE67CFc5b950e4e72b1BafC28C737bCe4C
    Value of counter:  33
*/ 