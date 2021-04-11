import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { createRequire } from 'module';
const Tezos = new TezosToolkit('https://edonet.smartpy.io/');
const require = createRequire(import.meta.url);

// Initiate a signer to access the API
const FAUCET_KEY = {
  "mnemonic": [
    "shock",
    "neutral",
    "barely",
    "seven",
    "juice",
    "depend",
    "vote",
    "judge",
    "wink",
    "antenna",
    "machine",
    "into",
    "mother",
    "collect",
    "bamboo"
  ],
  "secret": "33e364101b8caf998d5a4d627eac8130a85fd320",
  "amount": "15098525523",
  "pkh": "tz1dpMuoLM3uQWcefWwgDwsfhkKudQsgHsNk",
  "password": "5uOS4AzCZh",
  "email": "caojzivk.bdrbrxcc@tezos.example.org"
};

importKey(
  Tezos,
  FAUCET_KEY.email,
  FAUCET_KEY.password,
  FAUCET_KEY.mnemonic.join(' '),
  FAUCET_KEY.secret
).catch((e) => console.error(e));

// Originate the contract on the blockchain
const smartContractJSONfile = require('./smartContract/smartContractJSON.json');
// smart_contract.json is referring to Michelson source code in JSON representation
import {smartContractStorageMLSON} from './smartContract/smartContractStorage.js'

// Useful functions
const contractAbstractionOrigination = async (smartContractStorageMLSON) => {
  const originationOp = await Tezos.contract
  .originate({
      code: smartContractJSONfile,
      init: smartContractStorageMLSON,
  })
  console.log(`Waiting for contract origination confirmation...`)
  const contract = await originationOp.contract();
  console.log('Origination completed!');
  return contract;
};

const getContract = async (contractAddress) => {
  const contract = await Tezos.contract.at(contractAddress);
  return contract
};

const getContractData = async (contractAddress) => {
  const contract = await Tezos.contract.at(contractAddress);
  const storage = await contract.storage();
  return storage
};

const updateContractStatus = async (contract,status) => {
  const updateOp = await contract.methods.update_status(status).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

const addContractDestination = async (contract,destination) => {
  const updateOp = await contract.methods.add_destination(destination).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

// destinations is a list
const updateContractDestinations = async (contract,destinations) => {
  const updateOp = await contract.methods.update_destination(destinations).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

const updateContractDescription = async (contract,description) => {
  const updateOp = await contract.methods.update_description(description).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

// const contract = await contractAbstractionOrigination(smartContractStorageMLSON);
// // const contract = await getContract("KT1QAzgCEK2sjHoMyw5gJNcsBkkMV97u6cBJ")
// const contractData = await getContractData(contract.address);
// // const contractData = await getContractData("KT1QAzgCEK2sjHoMyw5gJNcsBkkMV97u6cBJ");

// console.log('\nThe contract address is: %s',contract.address);
// console.log('\nData inside the contract:');
// console.log(contractData);
// // console.log('\nThe doc_status is: %s', contractData.doc_status);

// console.log('\nUpdating...');
// const updatedContractData = await updateContractDestinations(contract,['Test test']);
// console.log(updatedContractData);
