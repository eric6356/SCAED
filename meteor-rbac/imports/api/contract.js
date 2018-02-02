import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Connect, SimpleSigner } from 'uport-connect'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'

import * as c from '../models/collections'
import JSONData from '../truffle/build/contracts/RBAC.json'

const exp = {}

if (Meteor.isClient) {
  const handle = Meteor.subscribe('uportConfig.all')
  const network = {
    name: 'rinkeby',
    id: 4
  }

  Session.set('uportLoaded', false)

  Tracker.autorun(() => {
    if (handle.ready()) {
      const config = c.UPortConfig.findOne({ network: network.name })
      config.signer = SimpleSigner(config.signer)
      exp.uport = new Connect('INFO7510', config)
      // exp.web3 = exp.uport.getWeb3()
      exp.web3 = new Web3(exp.uport.getWeb3().currentProvider)  // using web3 1.0
      exp.RBACContract = TruffleContract(JSONData)
      exp.RBACContract.setProvider(exp.web3.currentProvider)
      Session.set('uportLoaded', true)
    }
  })
}

export default exp
