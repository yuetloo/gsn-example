# Gas Station Network (GSN)
This repository contains a contract, storage.sol, that implements the GsnRecipient interface. See [EIP 1613: Gas Stations network](https://eips.ethereum.org/EIPS/eip-1613) or [OpenGsn](https://docs.opengsn.org/learn/index.html) for more details about GSN.  GSN enables accounts that do not own ether to be able to call state changing functions in the contracts that implement the GsnRecipient interface.

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
The following example shows how to deploy to the ropsten testnet.  To deploy to a different network, supply your network using the `--network` switch.

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

## GSN Networks
This example currently only supports GSN 1.0 network.  The list of relay hubs for different environment can be found here: [GSN 1.0 networks](https://docs.opengsn.org/gsn-provider/networks.html#gsn_1_0).  For GSN 1.0, relay hubs in all networks have the same address: `0xD216153c06E857cD7f72665E0aF1d7D82172F494`.

## Testing
See [Gsn Signer tests](https://github.com/yuetloo/ethers.js/blob/gsn-signer/packages/tests/src.ts/test-gsn-signer.ts)

## License
MIT
