import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import MNID from 'mnid'

import api from '../../api'

const waitForMined = (txHash, response, pendingCB, successCB) => {
  if (response.blockNumber) {
    successCB()
  } else {
    pendingCB()
    pollingLoop(txHash, response, pendingCB, successCB)
  }
}

// Recursive polling to do continuous checks for when the transaction was mined
const pollingLoop = (txHash, response, pendingCB, successCB) => {
  setTimeout(function () {
    api.web3.eth.getTransaction(txHash, (error, response) => {
      if (error) { throw error }
      if (response === null) {
        response = { blockNumber: null }
      } // Some ETH nodes do not return pending tx
      waitForMined(txHash, response, pendingCB, successCB)
    })
  }, 1000) // check again in one sec.
}

export default class UPort extends Component {
  showModal () {
    !this.props.loading && api.uport
      .requestCredentials({
        requested: ['name', 'phone', 'country', 'email'],
        notifications: true
      })
      .then(credentials => {
        let instance

        api.RBACContract.deployed().then(i => {
          instance = i
        }).then(() => instance.totalOwners())
        .then(console.log)
        // api.RBACInstance.methods.owners(0)

        // console.log(credentials.address)

        // const address = MNID.decode(credentials.address).address
        // console.log(address)
        // const res = api.web3.eth.sendTransaction({from: address, to: '0x0d6eafe9ca0258b97839b07230a7ea8fa61b632a', value: api.web3.toWei(0.1, 'ether')}, (err, txHash) => {
        //   if (err) {
        //     throw err
        //   }
        //   console.log(txHash)
        // })
        // console.log(res)

        // Hello.setHello('world', {from: address}, (error, txHash) => {
        //   if (error) { throw error }
        //   console.log(txHash)
        //   waitForMined(txHash, { blockNumber: null }, // see next area
        //     function pendingCB () {
        //       console.log('still pending')
        //       // Signal to the user you're still waiting
        //       // for a block confirmation
        //     },
        //     function successCB (data) {
        //       console.log(data)
        //       // Great Success!
        //       // Likely you'll call some eventPublisherMethod(txHash, data)
        //     }
        //   )
        // })

        Accounts.callLoginMethod({
          methodArguments: [{ uportCredentials: credentials }],
          userCallback: err => err && console.error(err)
        })
      })
      .catch(err => {
        console.error(err)
        this.showModal() // TODO
      })
  }

  render () {
    this.showModal()
    return <div />
  }
}
