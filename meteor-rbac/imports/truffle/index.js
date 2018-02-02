import Web3 from 'web3'
import TruffleContract from 'truffle-contract'

import HelloData from './build/contracts/Hello.json'

export const web3 = new Web3('http://localhost:8545')
const getContract = data => {
  const Contract = TruffleContract(data)
  Contract.setProvider(web3.currentProvider)
  // FIXME: https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof Contract.currentProvider.sendAsync !== 'function') {
    Contract.currentProvider.sendAsync = function () {
      return Contract.currentProvider.send.apply(
            Contract.currentProvider, arguments
        )
    }
  }
  return Contract
}

export const Hello = getContract(HelloData)
