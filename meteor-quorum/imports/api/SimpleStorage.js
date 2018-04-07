import { Meteor } from 'meteor/meteor'
import Web3 from 'web3'
import SimpleStorageData from '../truffle/build/contracts/SimpleStorage.json'
import { Bank1, Bank2, Bank3, Auditor } from '../config'

const getContract = () => {
  const web3 = new Web3('http://localhost:22000')
  return web3.eth.getCoinbase().then(coinbase => new web3.eth.Contract(
    SimpleStorageData.abi,
    SimpleStorageData.networks['1'].address,
    { from: coinbase, gasPrice: 0 }
  ))
}

Meteor.methods({
  'simpleStorage.get' () {
    if (Meteor.isServer) {
      return getContract().then(i => i.methods.get().call())
    }
  },
  'simpleStorage.set' (value) {
    if (Meteor.isServer) {
      return getContract().then(i => i.methods.set(value).send({ privateFor: [Auditor] }))
    }
  }
})
