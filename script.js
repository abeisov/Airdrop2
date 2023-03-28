const contractAddress = "0x71F9dA20CE6e58eAd3540C92766D8DbD04918B94";
const contractABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97); //ChainID 97 BNBtestnet
let signer;
let contract;

async function airDrop() {
  const recipientAddresses =
    document.getElementById("recipientAddresses").value;
  const valuesInput = document.getElementById("values").value;
  console.log("Recipient addresses: " + recipientAddresses);
  console.log("Values input: " + valuesInput);

  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]); //account in metamask

      contract = new ethers.Contract(contractAddress, contractABI, signer);

      contract.airdrop(recipientAddresses, valuesInput);
    });
  });
}
