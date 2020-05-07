# Gas Station Network (GSN)
This repository contains a contract that implements the GsnRecipient interface. See [EIP 1613: Gas Stations network](https://eips.ethereum.org/EIPS/eip-1613) for more details about GSN.  GSN enables accounts that do not own ether to be able to call state changing functions in the contracts that implement the GsnRecipient interface

## Contracts
A test contract, Storage, that implements the GsnRecipient interface. It has functions to read and write a number storage value

The following in the contract folders are from [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts):
1. contracts/Context.sol
2. contracts/GSNRecipient.sol
3. contracts/IRelayHub.sol
4. contracts/IRelayRecipient.sol
5. contracts/Initializable.sol

## Bin
This folder contains a script to fund the Relay Hub. See following section for instructions to fund the relay hub

## How to Deploy the Contract
1. Deploy the Storage.sol contract 
   - run the following command line
     ```
     bin/gsn-cli.js deploy --network ropsten --account {json wallet path}
     ```

2. Fund the Relay Hub
   - Need to fund the newly created contract (from step 1) in the Relay Hub
   ```
     bin/gsn-cli.js fund {contract address from step 1} --account {json wallet path} --network ropsten 
   ```

## License
MIT
