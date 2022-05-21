const abi1 = require("../artifacts/contracts/ImplementationV1.sol/Impv1.json");
const abi2 = require("../artifacts/contracts/ImplementationV2.sol/Impv2.json");

async function main() {
  //getting signer
  const[signer] = await ethers.getSigners();

  // Geting all The compiled contracts
  const ImplementationV1Contract = await ethers.getContractFactory("Impv1");
  const ImplementationV2Contract = await ethers.getContractFactory("Impv2");
  const ProxyAdminContract = await ethers.getContractFactory("ProxyAdmin");
  const ProxyContract = await ethers.getContractFactory("TransparentUpgradeableProxy");

  // Deploying ImplementationV1Contract and ProxyAdminContract

  const ImplementationV1 = await ImplementationV1Contract.deploy();
  ImplementationV1.deployed();
  console.log("ImplementationV1 deployed at: ", ImplementationV1.address);

  const ProxyAdmin = await ProxyAdminContract.deploy();
  ProxyAdmin.deployed();
  console.log("ProxyAdmin deployed at: ", ProxyAdmin.address);

  // Creating fuction signature for initializer

  const ImplementationV1Interface = new ethers.utils.Interface(abi1.abi);
  const fragment = ImplementationV1Interface.getFunction("initializer");
  const data =ImplementationV1Interface.encodeFunctionData(fragment, [15]);

  console.log("Compiled function signature : ",data);

  // Deploying Proxy contract
  const Proxy= await ProxyContract.deploy(ImplementationV1.address,ProxyAdmin.address,data);
  Proxy.deployed();
  console.log("Proxy deployed at: ", Proxy.address);

  // Creating object of proxy which uses Abi of ImplementationV1

  const ProxyImpv1= new ethers.Contract(Proxy.address,abi1.abi,signer);
  let tx= await ProxyImpv1.increment();
  tx.wait();

  tx= await ProxyImpv1.getCounter();
  console.log("Value of counter: ",tx.toString());


  // Deploying ImplementationV2Contract
  const ImplementationV2 = await ImplementationV2Contract.deploy();
  ImplementationV2.deployed();
  console.log("ImplementationV2 deployed at: ", ImplementationV2.address);


  // Upgrading our proxy
  tx= await ProxyAdmin.upgrade(Proxy.address,ImplementationV2.address);

  // Creating object of proxy which uses Abi of ImplementationV2
  const ProxyImpv2= new ethers.Contract(Proxy.address,abi2.abi,signer);
  tx= await ProxyImpv2.incrementBy(17);
  tx.wait();

  tx= await ProxyImpv2.getCounter();
  console.log("Value of counter: ",tx.toString());

  // to see changes happen on Etherscan we would have to verify both proxy and implementation

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
