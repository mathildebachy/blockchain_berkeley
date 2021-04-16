import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { createRequire } from 'module';
import { smartContractStorageMLSON } from './smartContract/smartContractStorage.js'
import { smartContractJSONfile } from './smartContract/smartContractJSON.js'


// Initiate a signer to access the API
export const signerInitialization = async () => {
  const Tezos = new TezosToolkit('https://edonet.smartpy.io/');
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
  const signer = await InMemorySigner.fromFundraiser(FAUCET_KEY.email, FAUCET_KEY.password, FAUCET_KEY.mnemonic.join(' '))
  Tezos.setProvider({ signer: signer});
  return Tezos
}

// const params = {
//     date_of_birth:'"11/20/1997"',
//     doc_description:'"Fall and Spring transcripts"',
//     doc_status:'"pending"',
//     doc_type:'"Transcript"',
//     graduation_year:'"2021"',
//     send_to:['"Centrale Paris"','"Mines"'].join("; "),
//     student_first_name:'"Mathilde"',
//     student_last_name:'"Bachy"',
//     student_school_name:'"Berkeley"',
// }
const initContractStorageMLSON = (params) => {
    return `(Pair (Pair (Pair ${params.date_of_birth} ${params.doc_description}) (Pair ${params.doc_status} ${params.doc_type})) (Pair (Pair ${params.graduation_year} {${params.send_to}}) (Pair ${params.student_first_name} (Pair ${params.student_last_name} ${params.student_school_name}))))`
}

export const contractAbstractionOrigination = async (parameters) => {
  const Tezos = await signerInitialization();
  const originationOp = await Tezos.contract
  .originate({
      code: smartContractJSONfile,
      init: initContractStorageMLSON(parameters),
  })
  const contract = await originationOp.contract();
  return contract;
};
