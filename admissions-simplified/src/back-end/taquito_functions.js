import { Tezos, smartContractJSONfile } from './taquito.config.js'
import { smartContractStorageMLSON } from './smartContract/smartContractStorage.js'

// Useful functions
export const contractAbstractionOrigination = async (smartContractStorageMLSON) => {
  const originationOp = await Tezos.contract
  .originate({
      code: smartContractJSONfile,
      init: smartContractStorageMLSON,
  })
  const contract = await originationOp.contract();
  return contract;
};

export const getContract = async (contractAddress) => {
  const contract = await Tezos.contract.at(contractAddress);
  return contract
};

export const getContractData = async (contractAddress) => {
  const contract = await Tezos.contract.at(contractAddress);
  const storage = await contract.storage();
  return storage
};

export const updateContractStatus = async (contract,status) => {
  const updateOp = await contract.methods.update_status(status).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

export const addContractDestination = async (contract,destination) => {
  const updateOp = await contract.methods.add_destination(destination).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

// destinations is a list
export const updateContractDestinations = async (contract,destinations) => {
  const updateOp = await contract.methods.update_destination(destinations).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

export const updateContractDescription = async (contract,description) => {
  const updateOp = await contract.methods.update_description(description).send();
  const updateOpConfirmation = await updateOp.confirmation(3);
  const storageNew = await contract.storage(); 
  return storageNew
};

const contract = await contractAbstractionOrigination(smartContractStorageMLSON);
// // const contract = await getContract("KT1QAzgCEK2sjHoMyw5gJNcsBkkMV97u6cBJ")
// const contractData = await getContractData(contract.address);
// // const contractData = await getContractData("KT1QAzgCEK2sjHoMyw5gJNcsBkkMV97u6cBJ");

console.log('\nThe contract address is: %s',contract.address);
// console.log('\nData inside the contract:');
// console.log(contractData);
// // console.log('\nThe doc_status is: %s', contractData.doc_status);

// console.log('\nUpdating...');
// const updatedContractData = await updateContractDestinations(contract,['Test test']);
// console.log(updatedContractData);