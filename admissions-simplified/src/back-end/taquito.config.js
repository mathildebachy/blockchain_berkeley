import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';
import { createRequire } from 'module';
import { smartContractStorageMLSON } from './smartContract/smartContractStorage.js'

const require = createRequire(import.meta.url);
export const smartContractJSONfile = require('./smartContract/smartContractJSON.json');

const Tezos = new TezosToolkit('https://edonet.smartpy.io/');

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
// smart_contract.json is referring to Michelson source code in JSON representation
export { Tezos };