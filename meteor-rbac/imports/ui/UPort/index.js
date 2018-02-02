import React from 'react'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Spin } from 'antd'
import { Connect, SimpleSigner } from 'uport-connect'
import Web3 from 'web3'

import UPort from './UPort'
import * as c from '../../models/collections'

const network = 'rinkeby'

const UPortContainer = withTracker(props => {
  const handle = Meteor.subscribe('uportConfig.all')
  const loading = !handle.ready()
  let uport
  if (!loading) {
    const config = c.UPortConfig.findOne({ network })
    config.signer = SimpleSigner(config.signer)
    uport = new Connect('INFO7510', config)

    window.up3 = new Web3(uport.getWeb3().currentProvider)
  }
  return {
    loading,
    uport
  }
})(props => (
  <Spin spinning={props.loading}>
    <div style={{ width: '100vw', height: '100vh' }}>
      {Meteor.user() === null && <UPort {...props} />}
    </div>
  </Spin>
))

export default UPortContainer
