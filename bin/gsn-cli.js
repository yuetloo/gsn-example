#!/usr/bin/env node

'use strict';

const { inherits } = require('util');
const { ethers } = require('ethers');
const utils = ethers.utils;
const { cli: CLI, solc } = require('@ethersproject/cli');
const fs = require('fs');

const relayHubAddress = '0xD216153c06E857cD7f72665E0aF1d7D82172F494';
const abi = [ "function depositFor(address target) public payable" ];

const cli = new CLI.CLI();

function DeployPlugin() {}
inherits(DeployPlugin, CLI.Plugin);

function FundPlugin() {}
inherits(FundPlugin, CLI.Plugin);


DeployPlugin.getHelp = function() {
  return {
    name: 'deploy Contract',
    help: 'deploy the GSN enabled test contract'
  };
};

DeployPlugin.prototype.prepareArgs = async function(args) {
  await CLI.Plugin.prototype.prepareArgs.call(this, args);
  if (this.accounts.length !== 1) {
    this.throwError('deploy requires an account');
  }
};

DeployPlugin.prototype.run = async function(a) {
  await CLI.Plugin.prototype.run.call(this);
  let code = solc.compile(
    fs.readFileSync('./contracts/Storage.sol').toString(),
    {
      optimize: true,
      basedir: './contracts'
    }
  ).filter(c => c.name === 'Storage')[0];

  let factory = new ethers.ContractFactory(
    code.interface,
    code.bytecode,
    this.accounts[0]
  );

  let contract = await factory.deploy( { gasLimit: 2000000 });
  let receipt = await contract.deployed();
  console.log(receipt);
};

FundPlugin.getHelp = function() {
  return {
    name: 'fund ADDRESS',
    help: 'fund 0.1 eth on relay hub for RECIPIENT ADDRESS'
  };
};

FundPlugin.prototype.prepareArgs = async function(args) {
  await CLI.Plugin.prototype.prepareArgs.call(this, args);
  if (args.length !== 1) {
    this.throwUsageError('fund requires RECIPIENT ADDRESS');
  }

  if (this.accounts.length !== 1) {
    this.throwError('fund requires an account');
  }

  this.recipientAddress = args[0];
};

FundPlugin.prototype.run = async function(a) {
  await CLI.Plugin.prototype.run.call(this);

  const contract = new ethers.Contract( relayHubAddress, abi, this.accounts[0] );
  const wei = ethers.utils.parseEther('0.1');
  const tx = await contract.depositFor(this.recipientAddress, { value: wei });

  await tx.wait();
  console.log('Relay hub funding completed');
};

cli.addPlugin('fund', FundPlugin);
cli.addPlugin('deploy', DeployPlugin);

cli.run(process.argv.slice(2)).catch(err => {
  this.throwError(err);
});
